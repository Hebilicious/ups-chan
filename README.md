<p align="center"><a href="" target="_blank"><img width="100" src="https://cdn.discordapp.com/attachments/312317025357791242/403003504886546433/upschan.png" alt="UPS logo"></a></p>

# UPS-chan
UPS Black Desert Online guild discord bot.

## How to use

Create an auth.json at the directory root and paste your token like this :

```json
{ "token" : "ThisIsYourBotToken" }
```

You will probably need webpack installed globally ``` npm install -g webpack ```.

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

Production : If you want to run it with as a background task with pm2:
```sh
pm2 start ecosystem.config.js
```
pm2 will watch the dist folder and autorestart on new builds.


If you do not have yarn ``` npm install -g yarn ``` or use npm instead.

To use the nodewar functionnalities you need rethinkDB
Install instructions here are available on the official documentation.
https://www.rethinkdb.com/docs/install/
Make sure that the service is running on the default port.
