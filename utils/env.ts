import * as dotenv from 'dotenv';

const environment = process.env.ENV;
console.log(`Loading environment variables from .env.${environment}`);

dotenv.config({
  path: `./env/.env.${environment}`
});

export const ENV = {
  BASE_URL: process.env.BASE_URL || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  API_URL: process.env.API_URL || ''
};