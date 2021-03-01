const express = require("express");
const app = express();
const cron = require("node-cron");
const db = require("quick.db");
const config = require("./config.js");
const fs = require("fs");
const execSync = require("child_process").execSync;
const https = require("https");
app.use(
  express.static("static", {
    maxAge: 7200,
    setHeaders: function(res, path, stat) {
      res.set(
        "Onion-Location",
        fs
          .readFileSync(".data/hidden_service/hostname", "utf8")
          .replace("\n", "")
      );
    }
  })
);
cron.schedule(config.cronSchedule, () => {
  try {
    require("./getarticles.js");
  } catch (e) {
    console.log("Something went wrong while fetching articles", e);
  }
});

app.get("/posts", (req, res) => {
  res.set("Cache-Control", "max-age=7200");
  res.json({ blogs: db.get("blogs") });
});

const listener = app.listen(process.argv[3] || process.env.PORT || 80, () => {
  console.log("DevReader is listening on port " + listener.address().port);
  console.log(execSync("npm run build").toString());
});
