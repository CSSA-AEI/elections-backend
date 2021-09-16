/**
 * The User API currently has two routes:
 * POST /api/salt --> Fetches the level 1 salt for client-side hashing
 * POST /api/login --> Authenticates the user through voterAuth middleware
 */

import voterAuth from '../../../middleware/voterAuth';
import user from './user.controller';
import { Express } from 'express';

export default function (app: Express): void {
  app.route('/api/user/salt').post(user.get_salt);
  app.route('/api/user/login').post(voterAuth, user.login); // Passes through voterAuth Middleware first
}
