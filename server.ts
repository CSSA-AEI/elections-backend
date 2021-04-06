// Define required libraries.
import express from 'express';
import http from 'http';
import path from 'path';
// Define api routes
import user_routes from './src/api/user/v1/user.router';
import vote_routes from './src/api/vote/v1/vote.router';
// Define API Rate Limiter
// import rateLimiter from './src/middleware/rateLimiter';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require('dotenv').config();
}
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.set('trust proxy', 1); // Heroku Rate Limiter Config
// app.use(rateLimiter);

// Add app reference to routes.
user_routes(app);
vote_routes(app);

http.createServer(app).listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
