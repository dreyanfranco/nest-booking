import { JwtAuthGuard } from '@/auth/guards/user.guard';
import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaymentIntentDto } from './dto/payment-intent.dto';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post(':hotelId/payment-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(
    @Param('hotelId') hotelId: string,
    @Body() bookingData: CreateBookingDto,
    @Request() req,
  ): Promise<PaymentIntentDto> {
    const userId = req.user['id'];
    return this.bookingService.createPaymentIntent(
      hotelId,
      userId,
      bookingData,
    );
  }

  @Post(':hotelId/complete')
  @UseGuards(JwtAuthGuard)
  async completeBooking(
    @Param('hotelId') hotelId: string,
    @Body()
    completeBookingData: {
      bookingData: CreateBookingDto;
      paymentIntentId: string;
    },
    @Request() req,
  ) {
    const userId = req.user['id'];
    return this.bookingService.completeBooking(
      hotelId,
      userId,
      completeBookingData.bookingData,
      completeBookingData.paymentIntentId,
    );
  }

  // @Get()
  // findAll() {
  //   return this.bookingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookingService.remove(+id);
  // }
}
