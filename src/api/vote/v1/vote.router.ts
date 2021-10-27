/**
 * The Vote API currently has only one route:
 * -- POST /api/vote
 */

import voterAuth from '../../../middleware/voterAuth';
import vote from './vote.controller';
import { Express } from 'express';

export default function (app: Express): void {
  app.route('/api/vote/status').get(vote.get_voting_status);
  app.route('/api/vote/candidates').get(vote.get_candidates);
  app.route('/api/vote/submit').post(voterAuth, vote.submit); // Passes through voterAuth Middleware first
}
