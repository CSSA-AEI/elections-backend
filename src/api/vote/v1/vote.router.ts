import voterAuth from '../../../middleware/voterAuth';
import vote from './vote.controller';
import { Express } from 'express';

export default function (app: Express): void {
  app.route('/api/vote').post(voterAuth, vote.submit_form);
}
