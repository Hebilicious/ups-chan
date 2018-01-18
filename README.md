<p align="center"><a href="" target="_blank"><img width="100" src="https://cdn.discordapp.com/attachments/312317025357791242/403003504886546433/upschan.png" alt="UPS logo"></a></p>

# UPS-chan
UPS Black Desert Online guild discord bot.

## How to use

Create an auth.json at the directory root and paste your token like this :

```json
{ "token" : "ThisIsYourBotToken" }
```

Then on your terminal:

```sh
yarn install
npm run dev
```

To build:
```sh
npm run build
```

To build without webpack (should work better on windows):
```sh
npm run build-nowp
```
You will webpack installed globally ``` npm install -g webpack ```.
If you do not have yarn ``` npm install -g yarn ``` or use npm instead.

To use the nodewar functionnalities you need rethinkDB
https://www.rethinkdb.com/docs/install/
