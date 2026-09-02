require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

const EMI_PLANS = [
  { tenure: 3, interestRate: 0, cashback: 7500 },
  { tenure: 6, interestRate: 0, cashback: 7500 },
  { tenure: 12, interestRate: 0, cashback: 7500 },
  { tenure: 24, interestRate: 0, cashback: 7500 },
  { tenure: 36, interestRate: 10.5, cashback: 7500 },
  { tenure: 48, interestRate: 10.5, cashback: 0 },
  { tenure: 60, interestRate: 10.5, cashback: 0 },
];

const products = [
  {
    name: 'Apple iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    description:
      'The iPhone 17 Pro features a titanium design, A19 Pro chip, advanced camera system with 5x optical zoom, and all-day battery life. Experience the most powerful iPhone ever.',
    variants: [
      {
        name: '256GB Orange',
        storage: '256GB',
        color: 'Orange',
        colorHex: '#FF6B35',
        mrp: 149900,
        price: 134900,
        image:
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '256GB Silver',
        storage: '256GB',
        color: 'Silver',
        colorHex: '#C0C0C0',
        mrp: 149900,
        price: 134900,
        image:
          'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '512GB Orange',
        storage: '512GB',
        color: 'Orange',
        colorHex: '#FF6B35',
        mrp: 169900,
        price: 149900,
        image:
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '512GB Silver',
        storage: '512GB',
        color: 'Silver',
        colorHex: '#C0C0C0',
        mrp: 169900,
        price: 149900,
        image:
          'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      },
    ],
    emiPlans: EMI_PLANS,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    description:
      'Galaxy S24 Ultra with built-in S Pen, 200MP camera, Galaxy AI features, and titanium frame. The ultimate productivity smartphone for power users.',
    variants: [
      {
        name: '256GB Titanium Gray',
        storage: '256GB',
        color: 'Titanium Gray',
        colorHex: '#8B8B8B',
        mrp: 129999,
        price: 114999,
        image:
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '256GB Titanium Black',
        storage: '256GB',
        color: 'Titanium Black',
        colorHex: '#2C2C2C',
        mrp: 129999,
        price: 114999,
        image:
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '512GB Titanium Gray',
        storage: '512GB',
        color: 'Titanium Gray',
        colorHex: '#8B8B8B',
        mrp: 149999,
        price: 129999,
        image:
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '512GB Titanium Black',
        storage: '512GB',
        color: 'Titanium Black',
        colorHex: '#2C2C2C',
        mrp: 149999,
        price: 129999,
        image:
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      },
    ],
    emiPlans: EMI_PLANS,
  },
  {
    name: 'Google Pixel 10 Pro',
    slug: 'google-pixel-10-pro',
    brand: 'Google',
    description:
      'Pixel 10 Pro delivers the best of Google AI with Magic Editor, Best Take, and unmatched computational photography. Pure Android experience with 7 years of updates.',
    variants: [
      {
        name: '128GB Black',
        storage: '128GB',
        color: 'Black',
        colorHex: '#1A1A1A',
        mrp: 106999,
        price: 94999,
        image:
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '128GB White',
        storage: '128GB',
        color: 'White',
        colorHex: '#F5F5F5',
        mrp: 106999,
        price: 94999,
        image:
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '256GB Black',
        storage: '256GB',
        color: 'Black',
        colorHex: '#1A1A1A',
        mrp: 116999,
        price: 104999,
        image:
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      },
      {
        name: '256GB White',
        storage: '256GB',
        color: 'White',
        colorHex: '#F5F5F5',
        mrp: 116999,
        price: 104999,
        image:
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
      },
    ],
    emiPlans: EMI_PLANS,
  },
];

const seed = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`Seeded ${inserted.length} products successfully`);

    inserted.forEach((p) => {
      console.log(`  - ${p.name} (${p.slug}) - ${p.variants.length} variants`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
