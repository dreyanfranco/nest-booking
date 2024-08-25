import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import { HotelModule } from './hotel/hotel.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [UserModule, SearchModule, HotelModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
