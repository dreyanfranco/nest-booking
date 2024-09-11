import { HotelType } from '@/types/index';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateHotelDto implements Partial<HotelType> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Min(1)
  adultCount: number;

  @IsNumber()
  @Min(0)
  childCount: number;

  @IsArray()
  @IsString({ each: true })
  facilities: string[];

  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  starRating: number;

  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];
}
