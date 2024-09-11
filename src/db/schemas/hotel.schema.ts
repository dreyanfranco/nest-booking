import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type HotelDocument = Hotel & Document;
@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  adultCount: number;

  @Prop({ required: true })
  childCount: number;

  @Prop({ required: true })
  facilities: [string];

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ required: true, min: 1, max: 5 })
  starRating: number;

  @Prop({ required: true })
  imageUrls: [string];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner: User;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
