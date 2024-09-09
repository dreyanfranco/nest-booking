import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
}
