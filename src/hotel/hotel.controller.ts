import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
