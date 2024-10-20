import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/exampledb',
  TOKEN: process.env.TOKEN || '12345',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
};