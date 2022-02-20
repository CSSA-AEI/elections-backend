# Elections Backend

Server layer built with `Typescript`, `Node JS`, `Express` and `Mongoose`.

## Quick Setup

- Set up `.env`, as per the `.env.example` file (contact it@cssa-aei.ca for assistance)
- Run `yarn install` (requires `node ^17.0.1` & `yarn ^1.22.10`)
- Run `yarn dev`

## Routes

### User Routes

- POST `/api/user/salt` with body: `sha` --> Fetches the 1st level salt of the voter for client-side hashing.

- POST `/api/user/login` with body: `sha` & `hash` --> (_voterAuth_) --> Authenticates the voter through middleware.

### Vote Routes

- GET `/api/vote/status` --> Returns whether voting is open, closed, or hasn't started.

- GET `/api/vote/candidates` --> Returns the list of candidates to client.

- POST `/api/vote/submit` with body: `sha` & `hash` & `poll` --> (_voterAuth_) --> Inserts the voter's `poll` data in DB.

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

## Getting Ready for the Next Election

For any assistance, contact `amaha100@uottawa.ca`.

### [elections-backend](https://github.com/CSSA-AEI/elections-backend)

1.  Update `elections-backend/assets/candidates.ts` to include all the candidates running for the current term. Example:

```javascript
FNCE: [{ name: 'Omer Abubaker', val: 'abubaker' }]; // `val` is always the candidate's last name
```

2. Verify that the environment variables are correctly set up in the Production & Development Environment of the [elections-backend Heroku Pipeline](https://dashboard.heroku.com/pipelines/6212bfb6-1301-4304-9a8d-76dba1c4de6f).

### [elections-frontend](https://github.com/CSSA-AEI/elections-frontend)

1. Update the `candidatesPage` section in `elections-frontend/src/locale/en.json` and `elections-frontend/src/locale/fr.json`. For each candidate, add their platforms in that object, using their last name as the object key. Example:

```javascript
"candidatesPage": { // An example of what the en.json file would look like
    "subtitle": "You can access the platforms of the candidates running for the CSSA 20__-20__ term below.",
    "abubaker": "Omer's english platform \n This is a new line",
    "mahanna": "Anthony's english platform"
}
```

2. Add the image of each candidate under the `public/candidates/` directory. **The format must be JPG, and must be passed through the following image resizer first:** https://www.onlineresizeimage.com/instagram-profile-picture-resizer/. If the resizer says `image is too small`, then increase the pixel size first through this website: https://www.resizepixel.com/.

3. Verify that the environment variables are correctly set up in the Production & Development Environments of the [elections-frontend Heroku Pipeline](https://dashboard.heroku.com/pipelines/6a561515-c587-4924-a53d-c787f75db2ce).

