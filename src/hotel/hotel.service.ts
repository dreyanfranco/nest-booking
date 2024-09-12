import { Hotel, HotelDocument } from '@/db/schemas/hotel.schema';
import { UserDocument } from '@/db/schemas/user.schema';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async createHotel(
    createHotelDto: CreateHotelDto,
    user: UserDocument,
  ): Promise<Hotel> {
    try {
      const newHotel = new this.hotelModel({
        ...createHotelDto,
        owner: user._id,
      });
      return await newHotel.save();
    } catch (error) {
      console.error('Error creating hotel:', error);

      throw new InternalServerErrorException('Failed to create hotel');
    }
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

  // update(id: number, updateHotelDto: UpdateHotelDto) {
  //   return `This action updates a #${id} hotel`;
  // }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
