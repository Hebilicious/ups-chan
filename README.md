<p align="center"><a href="" target="_blank"><img width="100" src="https://cdn.discordapp.com/attachments/312317025357791242/403003504886546433/upschan.png" alt="UPS logo"></a></p>

# UPS-chan [![Build Status](https://travis-ci.org/Hebilicious/ups-chan.svg?branch=master)](https://travis-ci.org/Hebilicious/ups-chan)

UPS Black Desert Online guild discord bot.

## TODO

...

> This bot might have some hardcoded ids/emojis. You'll need to refactor it a bit.

## How to use

Make sure you have a working node.js environment.
Install rethinkdb => Official instructions [here](https://www.rethinkdb.com/docs/install/).
Make sure that the service is running on the default port.
If you do not have yarn `npm install -g yarn` or use npm instead.

Create an auth.json at the directory root and paste your token like this :

```json
{ "token": "ThisIsYourBotToken" }
```

Look for the auth.example.json and paste your other service user/keys there.

Then on your terminal:

```sh
yarn install
npm run dev
```

To build and run:

```sh
npm run build
node dist/app.js
```

### Production

If you want to run the bot as a background task with pm2:

```sh
npm install -g pm2
npm run build
pm2 start ecosystem.config.js
```

pm2 will watch the dist folder and autorestart the bot on a new build or when it crashes.
