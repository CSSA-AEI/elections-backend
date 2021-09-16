/**
 * Handles form submission once a request is received from the Frontend
 */
import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { UserObject } from '../../../model/User';
import CANDIDATES from '../../../../assets/candidates';

namespace VoteController {
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
    UserObject.findOneAndUpdate({ sha }, { hasVoted: true, poll, voteDate: EST }, null, (err: CallbackError, response: any) => {
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
