import { Booking, BookingSchema } from '@/db/schemas/booking.schema';
import { Hotel, HotelSchema } from '@/db/schemas/hotel.schema';
import { StripeService } from '@/stripe/stripe.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, StripeService],
})
export class BookingModule {}
