# 1Fi SDE1 Assignment

## Overview

1Fi EMI Product Store is a full-stack web application that lets users browse smartphones and select EMI plans backed by mutual funds. All product data — including variants, pricing, images, and EMI plans — is loaded dynamically from a REST API connected to MongoDB. No product data is hardcoded in the React frontend.

## Tech Stack

**Frontend:**
- React.js with Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React icons

**Backend:**
- Node.js
- Express.js
- Mongoose

**Database:**
- MongoDB

## Architecture

```
React (Client)
     |
  REST API
     |
Express (Server)
     |
  MongoDB
```

## Setup Instructions

### 1. Clone repository

```bash
git clone <repo-url>
cd project
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `.env` file (copy from `.env.example`):

```env
MONGO_URI=mongodb://localhost:27017/1fi-emi-store
PORT=5000
CLIENT_URL=http://localhost:5173
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`.

### 3. Frontend setup

```bash
cd client
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

### GET /api/products

Returns all products with summary information.

**Response:**

```json
{
  "success": true,
  "count": 3,
  "products": [
    {
      "_id": "...",
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "description": "...",
      "startingPrice": 134900,
      "variantCount": 4,
      "image": "https://..."
    }
  ]
}
```

### GET /api/products/:slug

Returns complete product details including variants and calculated EMI plans.

**Example:** `GET /api/products/iphone-17-pro`

**Response:**

```json
{
  "success": true,
  "product": {
    "_id": "...",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "description": "...",
    "variants": [
      {
        "_id": "...",
        "name": "256GB Orange",
        "storage": "256GB",
        "color": "Orange",
        "colorHex": "#FF6B35",
        "mrp": 149900,
        "price": 134900,
        "image": "https://..."
      }
    ],
    "emiPlans": [...],
    "emiPlansWithAmounts": [
      {
        "tenure": 3,
        "interestRate": 0,
        "cashback": 7500,
        "monthlyAmount": 44967,
        "totalPayable": 134901
      }
    ],
    "startingPrice": 134900
  }
}
```

### GET /api/products/:slug/emi-plans?variantId=...

Returns EMI plans calculated for a specific variant price.

**Response:**

```json
{
  "success": true,
  "variant": { ... },
  "emiPlans": [
    {
      "tenure": 3,
      "interestRate": 0,
      "cashback": 7500,
      "monthlyAmount": 44967,
      "totalPayable": 134901
    }
  ]
}
```

## Database Schema

### Product

| Field       | Type     | Description                    |
|-------------|----------|--------------------------------|
| name        | String   | Product name                   |
| slug        | String   | Unique URL-friendly identifier |
| brand       | String   | Brand name                     |
| description | String   | Product description            |
| variants    | Array    | Storage/color/price variants   |
| emiPlans    | Array    | Tenure, interest, cashback     |
| createdAt   | Date     | Auto-generated                 |
| updatedAt   | Date     | Auto-generated                 |

### Variant (embedded)

| Field    | Type   | Description              |
|----------|--------|--------------------------|
| name     | String | e.g. "256GB Orange"      |
| storage  | String | e.g. "256GB"             |
| color    | String | e.g. "Orange"            |
| colorHex | String | Hex color code           |
| mrp      | Number | Maximum retail price     |
| price    | Number | Selling price            |
| image    | String | Product image URL        |

### EMI Plan (embedded)

| Field        | Type   | Description                |
|--------------|--------|----------------------------|
| tenure       | Number | Duration in months         |
| interestRate | Number | Annual interest percentage |
| cashback     | Number | Cashback amount (optional) |

Monthly EMI amounts are calculated server-side using the standard EMI formula via `calculateEmi(price, annualInterestRate, tenureMonths)`.

## Features

- Dynamic product data from MongoDB via REST API
- Product listing page with cards
- Unique shareable product URLs (`/products/:slug`)
- Multiple storage and color variants per product
- Variant selection updates image and price
- EMI plans recalculated per variant
- Selectable EMI plan cards with visual feedback
- Confirmation modal with order summary
- Skeleton loading states
- Error handling with retry
- Fully responsive design (desktop, tablet, mobile)
- Production-ready with Helmet, CORS, Morgan

## Deployment

### Frontend: Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL=https://your-render-app.onrender.com/api`
5. Deploy

### Backend: Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `PORT` — `5000`
   - `CLIENT_URL` — your Vercel frontend URL
7. Deploy

### Database: MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user and whitelist IP `0.0.0.0/0` (or your server IP)
3. Copy the connection string to `MONGO_URI`
4. Run `npm run seed` locally with the Atlas URI to populate data

## Demo Video

Demo Video: \<add Google Drive/YouTube link\>

## Live Demo

Frontend: \<Vercel URL\>

Backend: \<Render URL\>
