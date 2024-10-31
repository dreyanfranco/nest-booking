import { JwtAuthGuard } from '@/auth/guards/user.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  // @Get('dashboard')
  // @UseGuards(JwtAuthGuard)
  // async getUserDashboard(@Request() req) {
  //   const userId = req.user['id'];
  //   return this.userService.getUserDashboard(userId);
  // }

  @Get('hotels')
  @UseGuards(JwtAuthGuard)
  async getUserHotels(@Request() req) {
    const userId = req.user['id'];
    return this.userService.getUserHotels(userId);
  }

  // @Get('bookings')
  // @UseGuards(JwtAuthGuard)
  // async getUserBookings(@Request() req) {
  //   const userId = req.user['id'];
  //   return this.userService.getUserBookings(userId);
  // }
}
