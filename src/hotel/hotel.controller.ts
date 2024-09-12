import { JwtAuthGuard } from '@/auth/guards/user.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createHotel(@Body() createHotelDto: CreateHotelDto, @Request() req) {
    try {
      return await this.hotelService.createHotel(createHotelDto, req.user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create hotel',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
  //   return this.hotelService.update(+id, updateHotelDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
