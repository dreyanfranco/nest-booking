import { IsDateString, IsNumber, IsString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @IsNumber()
  @Min(1)
  adultCount: number;

  @IsNumber()
  @Min(0)
  childCount: number;
}
