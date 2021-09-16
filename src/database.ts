/**
 * In charge of connecting to MongoDB through Mongoose
 * @requires MONGO_URI environment Variable
 */

import mongoose from 'mongoose';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require('dotenv').config();
}

const mongo_uri: string = process.env.MONGO_URI!;

// Connect to MongoDB instance.
mongoose
  .connect(mongo_uri)
  .then(() => console.log('Database Connected Successfully')) // eslint-disable-line no-console
  .catch(err => {
    console.error(err); // eslint-disable-line no-console
  });
