import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import path from "path";

import Discord from "discord.js";

const config: {
  TOKEN: string;
  PREFIX: string;
} = require("../config.js");

class Client extends Discord.Client {}

const client = new Client();

client.on("ready", () => {
  console.log("Bot | Ready!");
});

client.on("warn", console.warn);
client.on("error", console.error);

client.login(config.TOKEN);

setTimeout(function () {
  const user = client.users.cache.get("457805013474082817");

  const app = express();

  const router = express.Router();

  router.get("/", function (req, res) {
    console.log("Serving / to user.");
    res.sendFile(path.join(__dirname + "/../views/index.html"));
  });

  router.get("/api", (req, res, next) => {
    console.log("Serving API to user.");
    res.json({
      status: "200",
      content: user.presence.status,
    });
  });

  app.use("/", router);
  app.listen(process.env.port || "8080");
  console.log("Listening, loud and clear.");
}, 3000);
