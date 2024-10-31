import { Hotel, HotelDocument } from '@/db/schemas/hotel.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/db/schemas/user.schema';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async getUserHotels(userId: string) {
    const hotels = await this.hotelModel
      .find({ owner: userId })
      .populate({
        path: 'bookings',
        select:
          'firstName lastName email checkInDate checkOutDate adultCount childCount totalPrice',
        options: { sort: { checkInDate: -1 } },
      })
      .select('-owner');

    const hotelsWithStats = hotels.map((hotel) => {
      const bookings = hotel.bookings || [];
      const stats = {
        totalBookings: bookings.length,
        upcomingBookings: bookings.filter(
          (booking) => new Date(booking.checkInDate) >= new Date(),
        ).length,
        totalRevenue: bookings.reduce(
          (sum, booking) => sum + booking.totalPrice,
          0,
        ),
      };

      return {
        ...hotel.toObject(),
        stats,
      };
    });

    return hotelsWithStats;
  }
}
