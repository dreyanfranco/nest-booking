# Booking App

This Booking App allows users to:

    •	Register and log in to their accounts.
    •	Perform full CRUD operations on their profile.
    •	Browse available hotels and view detailed information.
    •	Book hotels easily and manage their reservations. (Stripe)

## API Reference

#### Get all hotels

```http
  GET /hotels
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get hotel

```http
  GET /hotels/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to fetch |

#### Create hotel

```http
  POST /hotels
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to fetch |

#### Update hotel

```http
  PATCH /hotels/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to update |

#### Delete hotel

```http
  DELETE /hotels/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to delete |

#### Payment Intent

```http
  POST /booking/:hotelId/payment-intent
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to fetch |

Generates paymentIntentId which will be needed to complete booking.

#### Complete booking

```http
  POST /booking/:hotelId/complete
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to fetch |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MongoDB`

MONGODB_CONNECTION_STRING=mongodb+srv://dreyanfranco:joey1010@booking-app.4lvpsh5.mongodb.net/booking-app

`JWT`

JWT_SECRET_KEY=Q7rgNSXA4tKaeseZHD1pc6meRecYlFGG

FRONTEND_URL=http://localhost:5173
PORT=5001

`Cloudinary`

CLOUDINARY_API_KEY=541238979172793

CLOUDINARY_API_SECRET=WTcdGP_8VYkbpT0rEP2BbkdWq_s

CLOUDINARY_CLOUD_NAME=dnuckf3ly

`Stripe`

STRIPE_API_KEY=sk_test_51Ot7IVBPw3TgobqbQZFml2B9nTBKTdH9kmih72PLGiw2CKHNkQ7w0j9g3RVE9bGctCnGkJKNUsqkpvoPUm0LWCHZ00i8qj9TjK

## Project setup

```bash
$ yarn install
```

## Development

To run this project run

```bash
  yarn dev
```
