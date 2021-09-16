/* eslint-disable */
import '../database';
import mailgun from 'mailgun-js';
import crypto from 'crypto';
import { UserObject } from '../model/User';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const readXlsxFile = require('read-excel-file/node');

const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL!;
const MAILGUN_API_KEY: string = process.env.MAILGUN_API_KEY!;
const MAILGUN_DOMAIN: string = process.env.MAILGUN_DOMAIN!;

const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

const schema = {
  id: {
    prop: 'id',
    type: String,
  },
  SESSION: {
    prop: 'session',
    type: String,
  },
  'PRÉNOM OFFICIEL': {
    prop: 'prenomofficiel',
    type: String,
  },
  'NOM OFFICIEL': {
    prop: 'nomofficiel',
    type: String,
  },
  'PRÉNOM PRÉFÉRÉ': {
    prop: 'prenomprefere',
    type: String,
  },
  'NOM PRÉFÉRÉ': {
    prop: 'nomprefere',
    type: String,
  },
  COURRIEL: {
    prop: 'courriel',
    type: String,
  },
  'LANGUE DE COMMUNICATION': {
    prop: 'langue',
    type: String,
  },
  'CHARGE ACADÉMIQUE': {
    prop: 'langue',
    type: String,
  },
  GROUP: {
    prop: 'group',
    type: String,
  },
  'PROG DESCR': {
    prop: 'program',
    type: String,
  },
  DISCIPLINE: {
    prop: 'discipline',
    type: String,
  },
  'PLAN DESCR': {
    prop: 'plan',
    type: String,
  },
  LEVEL: {
    prop: 'level',
    type: String,
  },
  'RSG 1': {
    prop: 'rsg1',
    type: String,
  },
  'RSG 2': {
    prop: 'rsg2',
    type: String,
  },
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateSha(email: string, id: string): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-{}><';

  let random = '';
  for (let i = 0, n = charset.length; i < length; ++i) random += charset.charAt(Math.floor(Math.random() * n));

  return crypto.createHash('sha256').update(`${process.env.SERVER_SECRET}${email}${id}${random}`).digest('hex');
}

async function generateVoters(path: string): Promise<void> {
  readXlsxFile(__dirname + path, { schema }).then(async ({ rows, errors }: { rows: any; errors: any }) => {
    for (let i = 0; i < rows.length; i++) {
      try {
        const studentEntry: any = rows[i];

        const name: string = studentEntry.prenomofficiel;
        const email: string = studentEntry.courriel;
        const hash: string = studentEntry.id;
        const sha: string = generateSha(email, hash);
        const link = `https://vote.cssa-aei.ca/vote/${sha}`;

        const user = new UserObject({ sha, hash, salt: 'SALT', hasVoted: false });
        await user.save();

        await mg.messages().send({
          from: ADMIN_EMAIL,
          to: email,
          subject: 'VOTE(Z): CSSA-AÉI 2022-2023',
          html: `<!DOCTYPE html><html> <body> The CSSA Elections open March 31st at 10AM!<br></br> If you would like to participate in the election (starting 10AM on March 31st), your unique voting link is:<br></br> <a href=${link}>${link}</a><br></br> The deadline to vote is April 2nd at 10AM<br></br> Questions or issues? Your point of contact is it@cssa-aei.ca<br></br> Thank you for voting!<br> - Your CSSA exec team<br></br> ----------------------------------------------<br></br> ----------------------------------------------<br></br> Les élections de l'AÉI débutent le 31 Mars à 10h!<br></br> Si vous souhaitez participer à cette élection (qui commence le 31 Mars à 10h), votre lien de vote est:<br></br> <a href=${link}>${link}</a><br></br> La date limite pour voter est le 2 Avril à 10h<br></br> Questions ou problèmes? Votre point de contact est it@cssa-aei.ca<br></br> Merci pour votre participation!<br> - Votre équipe de direction de l'AÉI </body></html>`,
        });

        console.log('Success: ', i + 1);
      } catch (err: any) {
        console.log(err);
      }
    }
    console.log('Done.');
  });
}

(async () => {
  const delayTime = 15000;
  const PATH = '/../../../assets/test.xlsx';

  console.log(`PATH: ${PATH}`);
  console.log(`URI: ${process.env.MONGO_URI}`);
  console.log(`Starting in ${delayTime / 1000} seconds...`);
  await delay(15000);

  generateVoters(PATH);
})();
