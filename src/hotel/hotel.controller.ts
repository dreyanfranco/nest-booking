import { JwtAuthGuard } from '@/auth/guards/user.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
    @Request() req,
  ) {
    try {
      return await this.hotelService.updateHotel(id, updateHotelDto, req.user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update hotel',
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteHotel(@Param('id') id: string, @Request() req) {
    try {
      await this.hotelService.deleteHotel(id, req.user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete hotel',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
