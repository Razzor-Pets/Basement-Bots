# Collection of all the publically available Discord Bots

This consists of all the bots i have created for my Discord Server. **The Basement** which i use as a connection to connect with people close to me. You can join too if you want to by using this [link](https://discord.gg/76Fk7gwTpN). Heres the list of bots i have created:

- [**Ding Dong**](#ding-dong) - A simple on demand bot that can respond to messages for now. As per need i will add more features to it.

Yea that's like it for now 😂

It's not a lot but I did learn a lot about hosting on a **serverfull environment**. The code for the bot in itself is quite simple and I don't have a backend needed as it was not needed. I learned about **discord.js** and it's framework and honestly it was more easier than I thought. I also learned about **discloud** and how to host a bot on it. But for security reasons I didn't directly attach discould files to the repository. You can check **discloud docs** [here](https://docs.discloud.com/en) 

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```
3. Set up environment variables
4. Create a .env file in the root directory and add the following variables
```js
DING_DONG_TOKEN="<your bot token>" // get this from discord developer portal
BASEMENT_ID="<your server id>" // get this from discord server with developer mode turned on
BOT_TEST_CHANNEL="<your bot test channel id>" // get this from discord server using "\" before the id

// this is for my unique case, you can change after this as per your need from the bot
POKEMON_SPAWN_CHANNEL="<your pokemon spawn channel id>"
POKEMON_PING_ROLE="<your pokemon ping role id>"
```

## Usage

**For testing the bot locally**
```bash
npm run dev
```

There is not start script as it is not needed since we use discloud to host the bot and you mention:
- Which file to execute for the bot to run
- The environment variables needed for it to run
- The script to start the bot (In our case `npm run dev`)
in the discloud config file.


# Bots Available

## **Ding Dong**

A Simple On Demand Bot that can respond to messages for now. As per need i will add more features to it. The reasson behind it is created was the already present bots didn't have a feature to reply to embedded messages. That is to say, those bots don't read embedded messages and respond to them. 

> **Why they work like that:** The bots don't read embedded messages because most of the bots use embedded messages so it is not a good idea to use them for the bot to respond to them. That is why this bot is created to read embedded messages and respond to them. 

