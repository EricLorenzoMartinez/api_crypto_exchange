import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT = 3000,
  LOG_LEVEL = 'info',
  SECRET_KEY,
  DATABASE_URL,
  CLIENT_URL,
  NODE_ENV = 'development',
  COINCAP_API_URL = 'https://api.coincap.io/v2',
} = process.env;
