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
import { UpdateHotelDto } from './dto/update-hotel.dto';

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

  async updateHotel(
    id: string,
    updateHotelDto: UpdateHotelDto,
    user: UserDocument,
  ): Promise<Hotel> {
    try {
      const hotel = await this.hotelModel.findOne({ _id: id, owner: user._id });

      if (!hotel) {
        throw new NotFoundException(
          'Hotel not found or you do not have permission to update it',
        );
      }

      Object.assign(hotel, updateHotelDto);
      return await hotel.save();
    } catch (error) {
      console.error('Error updating hotel:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update hotel');
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

  async deleteHotel(id: string, user: UserDocument): Promise<void> {
    try {
      const result = await this.hotelModel.deleteOne({
        _id: id,
        owner: user._id,
      });

      if (result.deletedCount === 0) {
        throw new NotFoundException(
          'Hotel not found or you do not have permission to delete it',
        );
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete hotel');
    }
  }
}
