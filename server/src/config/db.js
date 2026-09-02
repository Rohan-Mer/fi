import { connect } from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  await connect(uri);
  console.log('MongoDB connected successfully');
};

export default connectDB;
