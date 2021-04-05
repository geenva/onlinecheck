import express from "express";
import path from "path";
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
    content:
      "Yes, this is working! But you see, we're not quite sure what to do with this API just yet. See you soon, in the future!",
  });
});

app.use("/", router);
app.listen(process.env.port || "8080");
console.log("Listening, loud and clear.");
