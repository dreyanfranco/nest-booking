import { HotelType } from '@/types/index';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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
  category: string;

  @IsNumber()
  @Min(1)
  adultCount: number;

  @IsNumber()
  @Min(0)
  childCount: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  facilities: string[];

  @IsNumber()
  @Min(0)
  pricePerNight: number;

  // @IsNumber()
  // @Min(1)
  // @Max(5)
  // starRating: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls: string[];
}
