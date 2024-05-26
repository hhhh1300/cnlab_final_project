import 'dotenv/config';

export const env = {
  DBHOST: process.env.DBHOST || 'localhost',
  DBUSER: process.env.DBUSER || 'root',
  DBDATABASE: process.env.DBDATABASE || 'mysql',
  DBPASSWORD: process.env.DBPASSWORD || 'mysql',
  DBPORT: Number(process.env.DBPORT) || 3306,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:8080',
  SECRET_KEY: process.env.SECRET_KEY || '878787',
  // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  // FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
  // FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
};
