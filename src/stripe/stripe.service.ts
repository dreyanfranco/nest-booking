import { PaymentIntentDto } from '@/booking/dto/payment-intent.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
  ): Promise<PaymentIntentDto> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });

    return {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalPrice: amount,
    };
  }
}
