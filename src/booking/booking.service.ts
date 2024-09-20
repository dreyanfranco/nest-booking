import { Booking, BookingDocument } from '@/db/schemas/booking.schema';
import { Hotel, HotelDocument } from '@/db/schemas/hotel.schema';
import { StripeService } from '@/stripe/stripe.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log('Booking Data:', bookingData);
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

    const nights =
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.round(nights * hotel.pricePerNight);
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
