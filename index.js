require("dotenv").config();
const express = require("express");
const path = require("path");

const Discord = require("discord.js");

const config = require("./config.js");

class Client extends Discord.Client {}

const client = new Client();

client.on("ready", () => {
  console.log("Bot | Ready!");

  const user = client.users.cache.get("457805013474082817");

  const app = express();

  const router = express.Router();

  router.get("/", function (req, res) {
    console.log("Serving / to user.");
    res.sendFile(path.join(__dirname + "/views/index.html"));
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
});

client.on("warn", console.warn);
client.on("error", console.error);

client.on("presenceUpdate", (user) => {
  const u = client.users.cache.get(user.userID);
  if (u.id == "757889906252185690") {
    if (u.presence.status == "online") {
      client.users.cache
        .get("803070319626944514")
        .send(":eyes: Your main is online, is that you?");
    }
  }
});

client.login(config.TOKEN);
