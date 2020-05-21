const express = require("express");
const app = express();
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
  }
);

const Urls = sequelize.import(__dirname + "/models/urls");

const run = async () => {
  await sequelize.authenticate();
  console.log("DB Authenticated!");

  await sequelize.sync();
  console.log("Succesfully synced!");
};

run().catch((error) => console.log(error));

app.get("/api/create/:url", (req, res) => {
  const longURL = req.params.url;

  let randString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  while (!Urls.findAll({ where: { shortURL: randString } })) {
    console.log("BROKEN");
    randString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  Urls.create({ shortURL: randString, longURL });

  res.json({ shortURL: "localhost:8080/" + randString });
});

app.get("/api/info/:url", (req, res) => {
  const shortURL = req.params.url;

  const run = async () => {
    let UrlObject = await Urls.findOne({ where: { shortURL } });

    if (!UrlObject) {
      return res.json("FAILED");
    }

    console.log(
      "Stats for redirect from " +
        UrlObject.shortURL +
        " to " +
        UrlObject.longURL
    );
    return res.json(UrlObject);
  };

  return run();
});

app.get("/:url", (req, res) => {
  const shortURL = req.params.url;

  const run = async () => {
    let UrlObject = await Urls.findOne({ where: { shortURL } });

    if (!UrlObject) {
      return res.json("FAILED");
    }

    Urls.update({ pageHits: UrlObject.pageHits + 1 }, { where: { shortURL } });
    await Urls.sync();

    console.log("Redirecting to " + UrlObject.longURL);
    if (UrlObject.longURL.indexOf("https://") !== -1) {
      return res.redirect(301, UrlObject.longURL);
    } else {
      return res.redirect(301, "https://" + UrlObject.longURL);
    }
  };

  return run();
});

const port = 8080;
// Listening for requests on a specific port
app.listen(port, () => {
  console.log("Server listening on port 8080");
});
