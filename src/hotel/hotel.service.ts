import { Hotel, HotelDocument } from '@/db/schemas/hotel.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  create(createHotelDto: CreateHotelDto) {
    return 'This action adds a new hotel';
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
    return hotel;
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find();
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
