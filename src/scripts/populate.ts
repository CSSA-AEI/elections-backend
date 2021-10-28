/* eslint-disable */
import mailgun from 'mailgun-js';
import crypto from 'crypto';

import '../database';
import { schema, delay, getHTMLMessage } from './utils';
import { UserObject } from '../model/User';

const prompt = require('prompt-sync')({ sigint: true });
const readXlsxFile = require('read-excel-file/node');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL!;
const MAILGUN_API_KEY: string = process.env.MAILGUN_API_KEY!;
const MAILGUN_DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const VOTING_START_EST = new Date(process.env.VOTING_START!);
const VOTING_END_EST = new Date(process.env.VOTING_DEADLINE!);

const VOTING_START_UTC: string = new Date(VOTING_START_EST.getTime() + new Date().getTimezoneOffset() * 60 * 1000).toUTCString();
const VOTING_DURATION_HOURS = (Math.abs((VOTING_END_EST as any) - (VOTING_START_EST as any)) / 36e5).toString();

const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

function generateSha(name: string, email: string, id: string): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-{}><';

  let random = '';
  for (let i = 0, n = charset.length; i < length; ++i) random += charset.charAt(Math.floor(Math.random() * n));

  return crypto.createHash('sha256').update(`${process.env.SERVER_SECRET}${name}${email}${id}${random}`).digest('hex');
}

async function generateVoters(path: string, checkpoint: number, enableMongo: boolean, enableMailgun: boolean): Promise<void> {
  readXlsxFile(__dirname + path, { schema }).then(async ({ rows, errors }: { rows: any; errors: any }) => {
    for (let i = 0; i < rows.length; i++) {
      if (i <= checkpoint) {
        console.log('Skipping: ', i + 1);
        continue;
      }

      try {
        const studentEntry: any = rows[i];

        const id: string = studentEntry.id;
        const email: string = studentEntry.courriel;
        const name: string = studentEntry.nomofficiel;

        const sha: string = generateSha(name, email, id);
        const link = `https://vote.cssa-aei.ca/vote/${sha}`;

        if (enableMongo) {
          const user = new UserObject({
            sha,
            hash: id,
            salt: 'SALT',
            hasVoted: false,
          });
          await user.save();

          if (enableMailgun) {
            const message = await mg.messages().send({
              'o:deliverytime': VOTING_START_UTC,
              from: ADMIN_EMAIL,
              to: email,
              subject: 'VOTE(Z): CSSA-AÉI',
              html: getHTMLMessage(link, VOTING_DURATION_HOURS),
            });
            console.log(message);
          }
        }

        console.log('Success: ', i + 1);
      } catch (err: any) {
        console.log(err);
      }
    }
    console.log('Done.');
  });
}

(async () => {
  const PATH = '/../../../assets/test.xlsx';
  const ENABLE_MONGO = true;
  const ENABLE_MAILGUN = true;

  console.log('ATTENTION: You are about to run a risk-prone script. Review:');
  console.log('\n\n----------------------------------');
  console.log(`PATH: ${PATH}`);
  console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
  console.log(`VOTING_START_EST: ${VOTING_START_EST.toDateString()}`);
  console.log(`VOTING_END_EST: ${VOTING_END_EST.toDateString()}`);
  console.log(`VOTING_START_UTC: ${VOTING_START_UTC}`);
  console.log(`VOTING_DURATION_HOURS: ${VOTING_DURATION_HOURS}`);
  console.log(`ADMIN_EMAIL: ${ADMIN_EMAIL}`);
  console.log(`MAILGUN_DOMAIN: ${MAILGUN_DOMAIN}`);
  console.log(`MAILGUN_API_KEY: ${MAILGUN_API_KEY}`);
  console.log(`ENABLE_MONGO: ${ENABLE_MONGO}`);
  console.log(`ENABLE_MAILGUN: ${ENABLE_MAILGUN}`);
  console.log('----------------------------------\n\n');

  const input = prompt('ARE YOU CERTAIN YOU WISH TO PROCEED? (yes/no): ');
  if (input !== 'yes') {
    throw Error('User is a chicken');
  }

  const delayTime = 10000;
  console.log(`Starting in ${delayTime / 1000} seconds. glhf`);
  for (let i = delayTime / 1000 - 1; i >= 1; i--) {
    console.log(i);
    await delay(1000);
  }

  generateVoters(PATH, -1, ENABLE_MONGO, ENABLE_MAILGUN);
})();
