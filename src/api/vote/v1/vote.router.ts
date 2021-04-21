/**
 * The Vote API currently has only one route:
 * -- POST /api/vote
 */

import voterAuth from '../../../middleware/voterAuth';
import vote from './vote.controller';
import { Express } from 'express';

export default function (app: Express): void {
  app.route('/api/vote').post(voterAuth, vote.submit_form); // Passes through voterAuth Middleware first
}
