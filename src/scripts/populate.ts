/* eslint-disable */
import crypto from 'crypto';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

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

const mg = new Mailgun(formData).client({ username: 'api', key: MAILGUN_API_KEY });

function generateSha(name: string, email: string, id: string): string {
  return crypto.createHash('sha256').update(`${process.env.SERVER_SECRET}${name}${email}${id}`).digest('hex');
}

async function generateVoters(path: string, enableMongo: boolean, enableMailgun: boolean): Promise<void> {
  readXlsxFile(__dirname + path, { schema }).then(async ({ rows }: { rows: any; errors: any }) => {
    for (let i = 0; i < rows.length; i++) {
      try {
        const studentEntry: any = rows[i];

        const id: string = studentEntry.id;
        const email: string = studentEntry.courriel;
        const name: string = studentEntry.nomofficiel;

        const sha: string = generateSha(name, email, id);
        const link = `https://vote.cssa-aei.ca/vote/${sha}`;

        const user = await UserObject.findOne({ sha });
        if (!user) {
          if (enableMongo) {
            const user = new UserObject({
              sha,
              hash: id,
              salt: 'SALT',
              hasVoted: false,
            });

            await user.save();

            if (enableMailgun) {
              const message = await mg.messages.create(MAILGUN_DOMAIN, {
                'o:deliverytime': VOTING_START_EST.toUTCString(),
                from: ADMIN_EMAIL,
                to: email,
                subject: 'VOTE(Z): CSSA-AÉI',
                html: getHTMLMessage(link, VOTING_END_EST.toLocaleString()),
              });

              console.log(message);
            }
          }

          console.log('Success: ', i + 1);
        } else {
          // User already exists
          console.log('Skipping: ', i + 1);
        }
      } catch (err: any) {
        console.log(err);
      }
    }
    console.log('Done (you can now safely exit this process with Ctrl + C)');
  });
}

(async () => {
  const PATH = '/../../../assets/test.xlsx';
  const ENABLE_MONGO = true;
  const ENABLE_MAILGUN = true;

  console.log('ATTENTION - Review the following:');
  console.log('\n\n----------------------------------');
  console.log(`PATH: ${PATH}`);
  console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
  console.log(`VOTING_START_EST: ${VOTING_START_EST.toLocaleString()}`);
  console.log(`VOTING_END_EST: ${VOTING_END_EST.toLocaleString()}`);
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

  generateVoters(PATH, ENABLE_MONGO, ENABLE_MAILGUN);
})();
