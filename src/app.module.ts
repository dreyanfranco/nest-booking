import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { HotelModule } from './hotel/hotel.module';
import { SearchModule } from './search/search.module';
import { StripeService } from './stripe/stripe.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    SearchModule,
    HotelModule,
    BookingModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, StripeService],
})
export class AppModule {}
