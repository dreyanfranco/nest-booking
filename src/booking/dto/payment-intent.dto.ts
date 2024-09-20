import { IsNumber, IsString } from 'class-validator';

export class PaymentIntentDto {
  @IsString()
  paymentIntentId: string;

  @IsString()
  clientSecret: string;

  @IsNumber()
  totalPrice: number;
}
