import { User } from '@/db/schemas/user.schema';

export type UserType = {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type HotelType = {
  _id?: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  owner: User;
  //   bookings: BookingType[];
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type BookingType = {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalPrice: number;
};
