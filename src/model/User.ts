/**
 * Stores the Schema structure of a user
 */

import { model, Schema, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';
import '../database';

const saltRounds = 14;

export interface IUser extends Document {
  sha: string;
  hash: string;
  salt: string;
  hasVoted: boolean;
  voteDate: Date;
  poll: typeof PollSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isCorrectHash(firstHash: string, callback: any): any;
}

/**
 * The PollSchema is made up of the 11 Executive Positions
 */
const PollSchema: Schema = new Schema({
  PRES: { type: String, required: true, default: null },
  FNCE: { type: String, required: true, default: null },
  ACDM: { type: String, required: true, default: null },
  SOCL: { type: String, required: true, default: null },
  COMS: { type: String, required: true, default: null },
  INTR: { type: String, required: true, default: null },
  EXTR: { type: String, required: true, default: null },
  PHIL: { type: String, required: true, default: null },
  EQUT: { type: String, required: true, default: null },
  EXAF: { type: String, required: true, default: null },
  INTE: { type: String, required: true, default: null },
});

/**
 * The UserSchema stores:
 * -- their unique voting ID (a sha256 value)
 * -- their level 2 hash (their password hashed twice)
 * -- their level 1 salt (The salt used for slow-client-side hashing)
 * -- their voting status
 * -- their time of vote
 */
const UserSchema = new Schema({
  sha: { type: String, required: true, unique: true },
  hash: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  hasVoted: { type: Boolean, required: true, default: false },
  voteDate: { type: Date, default: null },
  poll: { type: PollSchema, default: null },
});

/**
 * @function pre() Creates the user's hash & salt fields before saving it in DB
 * @requires bcrypt
 */
UserSchema.pre<IUser>('save', function (next: (err?: CallbackError) => void) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('hash')) {
    bcrypt.genSalt(saltRounds, (err, salt: string) => {
      bcrypt.hash(this.hash, salt, (err, firstHash: string) => {
        bcrypt.hash(firstHash, saltRounds, (err, secondHash: string) => {
          this.hash = secondHash;
          this.salt = salt;
          next();
        });
      });
    });
  } else {
    next();
  }
});

/**
 * @function isCorrectHash() Checks if the level 1 hash provided is correct
 *
 * @param this
 * @param firstHash
 * @param callback
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
UserSchema.methods.isCorrectHash = function (this: any, firstHash: string, callback: any) {
  bcrypt.compare(firstHash, this.hash, (err, same) => {
    if (err) {
      callback(err, false);
    } else {
      callback(err, same);
    }
  });
};

const UserObject = model<IUser>('User', UserSchema, 'users');
export { UserObject };
