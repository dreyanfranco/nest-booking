import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsDate()
  checkInDate: Date;

  @IsDate()
  checkOutDate: Date;

  @IsNumber()
  @Min(1)
  adultCount: number;

  @IsNumber()
  @Min(0)
  childCount: number;
}
