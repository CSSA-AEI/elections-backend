import voterAuth from '../../../middleware/voterAuth';
import user from './user.controller';
import { Express } from 'express';

export default function (app: Express): void {
  app.route('/api/salt').post(user.get_salt);
  app.route('/api/login').post(voterAuth, user.login);
}
