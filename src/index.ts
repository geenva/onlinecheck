////////////////////////////////////////////
/////         Create Discord App       /////
////////////////////////////////////////////

import * as dotenv from "dotenv";
dotenv.config();

import Discord from "discord.js";

const config: {
  TOKEN: string;
  PREFIX: string;
} = require("../config.js");

class Client extends Discord.Client {}

const client = new Client();

// basic events
client.on("ready", () => {
  console.log("Bot is online!");
});
client.on("warn", console.warn);
client.on("error", console.error);

client.login(config.TOKEN);
