<p align="center"><a href="" target="_blank"><img width="100" src="https://cdn.discordapp.com/attachments/312317025357791242/403003504886546433/upschan.png" alt="UPS logo"></a></p>

# UPS-chan [![Build Status](https://travis-ci.org/Hebilicious/ups-chan.svg?branch=master)](https://travis-ci.org/Hebilicious/ups-chan)

Lovely Black Desert Online guild discord bot, from the UPS guild (EU).

## Features

* NodeWar Scheduler
* FailStack Helper
* Boss Spawn announcement (NA/EU)
* Conversations
* Spoilers
* Very Frequent updates and new features.
* and plenty of hidden surprises !

## How to use

### For end-users

You can simply add the bot to your server using [this link](https://discordapp.com/api/oauth2/authorize?client_id=402582808456855552&permissions=8&scope=bot).
Refer to $help after the bot is in your server.

### For self hosting

> * This bot might have some hardcoded ids/emojis. You'll need to refactor it a bit.
> * Make sure you have a working node.js environment.
> * Install rethinkdb => Official instructions [here](https://www.rethinkdb.com/docs/install/).
> * Make sure that the service is running on the default port.
> * If you do not have yarn `npm install -g yarn` or use npm instead.

Create an auth.json at the directory root and paste your token like this :

```json
{ "token": "ThisIsYourBotToken" }
```

Look for the auth.example.json and paste your other service user/keys there.

Then on your terminal:

```sh
yarn install
yarn test
yarn dev
```

To build and run:

```sh
yarn build
node dist/app.js
```

#### Production

If you want to run the bot as a background task with pm2:

```sh
npm install -g pm2
yarn prod
pm2 start ecosystem.config.js
```

pm2 will watch the dist folder and autorestart the bot on a new build or when it crashes.

## TODO

* Tweak the spoiler to use hastebin/markdownshare instead of gifs since discord changed how the gifs are displayed.

```bash
haste() { a=$(cat); curl -X POST -s -d "$a" https://hastebin.com/documents | awk -F '"' '{print "https://hastebin.com/"$4}'; }
```

* Write more tests

## Contact

If you have any suggestions or bug to report, open an issue. PR's are welcome.
