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

function generateSha(name: string, email: string, id: string): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-{}><';

  let random = '';
  for (let i = 0, n = charset.length; i < length; ++i) random += charset.charAt(Math.floor(Math.random() * n));

  return crypto.createHash('sha256').update(`${process.env.SERVER_SECRET}${name}${email}${id}${random}`).digest('hex');
}

async function generateVoters(path: string): Promise<void> {
  readXlsxFile(__dirname + path, { schema }).then(async ({ rows, errors }: { rows: any; errors: any }) => {
    for (let i = 0; i < rows.length; i++) {
      try {
        const studentEntry: any = rows[i];

        const name: string = studentEntry.nomofficiel;
        const email: string = studentEntry.courriel;
        const id: string = studentEntry.id;
        const sha: string = generateSha(name, email, id);
        const link = `https://vote.cssa-aei.ca/vote/${sha}`;

        const user = new UserObject({
          sha,
          hash: id,
          salt: 'SALT',
          hasVoted: false,
        });
        await user.save();

        const date = new Date();
        const message = await mg.messages().send({
          from: ADMIN_EMAIL,
          to: email,
          subject: 'VOTE(Z): CSSA-AÉI 2022-2023',
          html: `<!DOCTYPE html><html><b>Date=${date}</b><br><br><body>The CSSA By-Elections open October 29 at 9AM!<br></br>If you would like to participate in the election (starting 9AM on October 29), your unique voting link is:<br></br> <a href=${link}>${link}</a><br></br> The deadline to vote is October 31st at 9AM<br>Questions or issues? Your point of contact is it@cssa-aei.ca<br></br>Thank you for voting!<br> - Your CSSA exec team<br></br><br></br><br></br>Les élections partielles de l'AÉI débutent le 29 Octobre à 9h!<br></br> Si vous souhaitez participer à cette élection (qui commence le 29 Octobre à 9h), votre lien de vote est:<br></br> <a href=${link}>${link}</a><br></br> La date limite pour voter est le 31 Octobre à 9h<br>Questions ou problèmes? Votre point de contact est it@cssa-aei.ca<br></br> Merci pour votre participation!<br> - Votre équipe de direction de l'AÉI </body></html>`,
        });
        console.log(message);
        console.log(`Date: ${date}`);

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
  for (let i = delayTime / 1000; i >= 1; i--) {
    process.stdout.write(`${i} `);
    await delay(1000);
  }

  console.log('\n');
  generateVoters(PATH);
})();
