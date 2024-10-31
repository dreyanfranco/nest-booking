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

To be disclosed

## Project setup

```bash
$ yarn install
```

## Development

To run this project run

```bash
  yarn dev
```
