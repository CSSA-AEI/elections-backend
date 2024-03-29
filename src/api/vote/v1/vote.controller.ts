/**
 * Handles form submission once a request is received from the Frontend
 */
import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { UserObject } from '../../../model/User';
import CANDIDATES from '../../../../assets/candidates';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require('dotenv').config();
}

const startDate: Date = new Date(process.env.VOTING_START!);
const startDateString: string = startDate.toLocaleString();
const endDate: Date = new Date(process.env.VOTING_DEADLINE!);
const endDateString: string = endDate.toLocaleString();

namespace VoteController {
  /**
   * @function get_voting_status() Returns whether voting is open, closed, or hasn't started.
   *
   * @param req
   * @param res
   */
  export function get_voting_status(req: Request, res: Response): void {
    const now: Date = new Date();
    const votingHasNotStarted: boolean = now.valueOf() - startDate.valueOf() < 0;
    const deadlineHasPassed: boolean = endDate.valueOf() - now.valueOf() < 0;
    const votingStatus = votingHasNotStarted ? 'voteStart' : deadlineHasPassed ? 'voteEnd' : 'voteOpen';

    res.status(200).send({ status: 200, votingStatus, startDateString, endDateString });
  }

  /**
   * @function get_candidates() Returns the current list of candidates of the election to client
   *
   * @param req
   * @param res
   */
  export function get_candidates(req: Request, res: Response): void {
    res.status(200).send({ status: 200, data: CANDIDATES });
  }

  /**
   * @function submit() Updates the user document in MongoDB with their ballot & date of vote
   *
   * If Error, return 500
   * If No Response (i.e sha value is not found), return 418 as we don't want to handle it
   * Else, return 201 and provide the user's date of vote
   *
   * @param req
   * @param res
   */
  export function submit(req: Request, res: Response): void {
    const { sha, poll } = req.body;
    if (!sha || !poll) res.status(400).send({ status: 400, message: 'Invalid Request: missing sha or poll data' });

    const UTC: Date = new Date();
    const EST: Date = new Date(UTC.getTime() + -UTC.getTimezoneOffset() * 60 * 1000);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UserObject.findOneAndUpdate({ sha }, { hasVoted: true, poll, voteTime: EST }, null, (err: CallbackError, response: any) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
        res.status(500).send({ status: 500, message: 'Error validating request' });
      } else if (!response) {
        res.status(418).send({ status: 418, message: 'Hi teapot!' });
      } else {
        const time: string = EST.toISOString().split('T')[1].split('.')[0];
        res.status(201).send({ status: 201, voteTime: time });
      }
    });
  }
}

export default VoteController;
