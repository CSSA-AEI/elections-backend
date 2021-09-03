/**
 * Middleware responsible for limitting API calls
 * @note Currently not being used
 */

import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 300,
  message: 'API call limit reached',
  headers: true,
});
