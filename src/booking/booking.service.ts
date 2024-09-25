import { Booking, BookingDocument } from '@/db/schemas/booking.schema';
import { Hotel, HotelDocument } from '@/db/schemas/hotel.schema';
import { StripeService } from '@/stripe/stripe.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaymentIntentDto } from './dto/payment-intent.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    private stripeService: StripeService,
  ) {}

  async createPaymentIntent(
    hotelId: string,
    userId: string,
    bookingData: CreateBookingDto,
  ): Promise<PaymentIntentDto> {
    const hotel = await this.hotelModel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    const totalCost = this.calculateTotalCost(bookingData, hotel);
    return this.stripeService.createPaymentIntent(totalCost);
  }

  private calculateTotalCost(
    bookingData: CreateBookingDto,
    hotel: HotelDocument,
  ): number {
    const checkInDate = new Date(bookingData.checkInDate);
    const checkOutDate = new Date(bookingData.checkOutDate);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      throw new BadRequestException('Invalid check-in or check-out date');
    }

    if (checkInDate >= checkOutDate) {
      throw new BadRequestException(
        'Check-out date must be after check-in date',
      );
    }

    const currentDate = new Date();
    if (checkInDate < currentDate) {
      throw new BadRequestException('Check-in date cannot be in the past');
    }

    if (typeof hotel.pricePerNight !== 'number' || isNaN(hotel.pricePerNight)) {
      throw new BadRequestException('Invalid hotel price');
    }

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const totalCost = Math.round(nights * hotel.pricePerNight);

    if (isNaN(totalCost) || totalCost <= 0) {
      throw new BadRequestException('Error calculating total cost');
    }

    return totalCost;
  }

  async completeBooking(
    hotelId: string,
    userId: string,
    bookingData: CreateBookingDto,
    paymentIntentId: string,
  ): Promise<Booking> {
    const hotel = await this.hotelModel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    const checkInDate = new Date(bookingData.checkInDate);
    const checkOutDate = new Date(bookingData.checkOutDate);

    const overlappingBookings = await this.bookingModel.findOne({
      hotel: hotelId,
      $or: [
        {
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate },
        },
        {
          checkInDate: { $gte: checkInDate, $lte: checkOutDate },
        },
      ],
    });

    if (overlappingBookings) {
      throw new BadRequestException(
        'The hotel is already booked for the selected dates.',
      );
    }

    const totalCost = this.calculateTotalCost(bookingData, hotel);

    const newBooking = new this.bookingModel({
      ...bookingData,
      owner: userId,
      hotel: hotelId,
      totalPrice: totalCost,
      paymentIntentId: paymentIntentId,
    });

    const savedBooking = await newBooking.save();

    hotel.bookings.push(savedBooking.id);
    await hotel.save();

    return savedBooking;
  }
}
