import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env.${process.env.NODE_ENV}` });
