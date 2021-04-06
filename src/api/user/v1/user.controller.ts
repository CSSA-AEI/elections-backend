import { UserObject, IUser } from '../../../model/User';
import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';

namespace UserController {
  export function login(req: Request, res: Response): void {
    res.status(200).send({
      status: 200,
      message: 'Welcome',
    });
  }

  export function get_salt(req: Request, res: Response): void {
    const { sha }: { sha: string } = req.body;
    UserObject.findOne({ sha }, (err: CallbackError, user: IUser) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
        res.status(500).send({ status: 500, message: 'Error validating request' });
      } else if (!user) {
        res.status(418).send({ status: 418, message: 'Hi teapot!' });
      } else {
        const message = user.salt;
        res.status(200).send({ status: 200, message });
      }
    });
  }
}

export default UserController;
