import { UserDocument } from '@/db/schemas/user.schema';
import { LoginUserDto } from '@/user/dto/login_user.dto';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<UserDocument | null> {
    const { email, password } = loginUserDto;
    const user = await this.userService.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const { email, password } = loginUserDto;

    const user = (await this.userService.findUserByEmail(
      email,
    )) as UserDocument;

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { username: user.email, sub: user._id.toString() }; // Use _id here
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
