# Elections Backend

Server layer built with `Typescript`, `Node JS`, `Express` and `Mongoose`.

## Quick Setup

- Set up `.env`, as per the `.env.example` file (contact it@cssa-aei.ca for assistance)
- Run `yarn install`
- Run `yarn dev`

## Routes

### User Routes

- POST `/api/salt` with body: `sha` --> Fetches the 1st level salt of the voter for client-side hashing.

- POST `/api/login` with body: `sha` & `hash` --> (_voterAuth_) --> Authenticates the voter through middleware.

### Vote Routes

- POST `/api/vote` with body: `sha` & `hash` & `poll` --> (_voterAuth_) --> Inserts the voter's `poll` data in DB.

## Scripts

- `yarn dev` - Compiles TS with watch tag & starts the server on port 5000 with nodemon
- `yarn clean` - Removes the `/dist` directory
- `yarn build` - Compiles TS
- `yarn start` - Starts the server on port 5000 with node (Mostly used by Heroku)
- `yarn populate` - Populates DB with voter data & fires emails through MailGun
- `yarn lint` - Scans the repo for any eslint violations
- `yarn lint:fix` - Fixes eslint violations
- `yarn prettier` - Reformats code to Prettier standards & fixes eslint violations

## Architecture

<img src="./assets/stack.png"  width="500"/>

For inquiries, contact `amaha100@uottawa.ca`

## Getting Ready for the Next Election

For any assistance, contact `amaha100@uottawa.ca`.

There are no "required" changes to do in this repository in preparation, as it is abstract enough to deal with remaining CSSA elections. However, it is up to the repo maintainer to make sure that there are no vulnerabilities if they decide to add new features.

That being said, simply verify that the environment variables are correctly set up in the Production Environment of the Heroku Application for this repo.
