import { UserDocument } from '@/db/schemas/user.schema';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<UserDocument> {
    const { sub: id } = payload; // Extract user id from JWT payload

    const user = await this.userService.findUserById(id); // Find the user by id

    if (!user) throw new UnauthorizedException('Token not valid');

    return user; // Return the user if found
  }
}
