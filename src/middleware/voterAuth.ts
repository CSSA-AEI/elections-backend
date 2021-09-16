/**
 * Middleware responsible for voter authentication
 * @requires VOTING_START Environment variable
 * @requires VOTING_DEADLINE Environment variabe
 */

import { UserObject, IUser } from '../model/User';
import { Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require('dotenv').config();
}

const startEST: Date = new Date(process.env.VOTING_START!);
const deadlineEST: Date = new Date(process.env.VOTING_DEADLINE!);

/**
 * @function voterAuth() Responsible for validating a user's authenticity
 * - If voting period has not started, return 401
 * - If sha value provided is not found in DB, return 401
 * - If hash value provided is not valid for sha, return 401
 * - If user has already voted, fetch time of vote & return 200
 * - If voting deadline has passed, return 403,
 * - Else, call next(), as the middleware has successfully validated the voter
 *
 * @param req
 * @param res
 * @param next
 * @returns void
 */
const voterAuth = function (req: Request, res: Response, next: NextFunction): void {
  const UTC: Date = new Date();
  const todayEST: Date = new Date(UTC.getTime() + -UTC.getTimezoneOffset() * 60 * 1000);
  const votingHasNotStarted: boolean = todayEST.valueOf() - startEST.valueOf() < 0;
  const deadlineHasPassed: boolean = deadlineEST.valueOf() - todayEST.valueOf() < 0;

  if (votingHasNotStarted) {
    res.status(403).send({ status: 403, message: 'vote-has-not-started' });
    return;
  }

  const { hash, sha }: { hash: string; sha: string } = req.body;
  UserObject.findOne({ sha }, (err: CallbackError, user: IUser) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      res.status(500).send({ status: 500, message: 'Error Validating Request' });
    } else if (!user) {
      res.status(401).send({ status: 401, message: 'Invalid login' });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user.isCorrectHash(hash, (hashError: any, same: boolean) => {
        if (hashError) {
          console.error(hashError); // eslint-disable-line no-console
          res.status(500).send({ status: 500, message: 'Error Validating Authentication Request' });
        } else if (!same) {
          res.status(401).send({ status: 401, message: 'Invalid login' });
        } else if (user.hasVoted) {
          const day = `${user.voteDate.getMonth() + 1}-${user.voteDate.getDate()}`;
          const time = user.voteDate.toISOString().split('T')[1].split('.')[0];

          res.status(200).send({
            status: 200,
            hasVoted: true,
            voteTime: `${day} ${time}`,
            ballot: user.poll,
          });
        } else if (deadlineHasPassed) {
          res.status(403).send({ status: 403, message: 'vote-has-ended' });
        } else {
          next();
        }
      });
    }
  });
};

export default voterAuth;
