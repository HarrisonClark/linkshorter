const express = require("express");
const app = express();
require("dotenv").config();
const { Sequelize } = require("sequelize");
const path = require("path");

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
const PageHits = sequelize.import(__dirname + "/models/pageHits");

const run = async () => {
  await sequelize.authenticate();
  console.log("DB Authenticated!");

  Urls.hasMany(PageHits, { as: "pageHits" });
  PageHits.belongsTo(Urls, {
    foreignKey: "id",
    as: "url",
  });

  await sequelize.sync(); //{ force: true } to clear
  console.log("Succesfully synced!");
};

run().catch((error) => console.log(error));

app.get("/api/create/:url", (req, res) => {
  const longURL = req.params.url;
  const { desiredURL } = req.query;

  const run = async () => {
    if (desiredURL) {
      let taken = await Urls.findOne({ where: { shortURL: desiredURL } });
      if (taken) {
        console.log("RETURNING TAKEN");
        return res.json({ status: "TAKEN", shortURL: "" });
      } else {
        Urls.create({ shortURL: desiredURL, longURL });
        return res.json({
          status: "SUCCESS",
          shortURL: "localhost:8080/" + desiredURL,
        });
      }
    } else {
      let randString = Math.random().toString(36).substring(2, 15);
      let taken = await Urls.findOne({ where: { shortURL: randString } });
      console.log(taken);
      while (taken) {
        console.log("TAKEN-UPDATING");
        randString =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        taken = await Urls.findOne({ where: { shortURL: randString } });
      }

      Urls.create({ shortURL: randString, longURL });
      return res.json({
        status: "SUCCESS",
        shortURL: "localhost:8080/" + randString,
      });
    }
  };
  return run();
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

    Urls.update(
      { pageHitCount: UrlObject.pageHitCount + 1 },
      { where: { shortURL } }
    );
    PageHits.create({ urlId: UrlObject.id });
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

// Static hosting of built React files
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || 8080; // Listening for requests on a specific port
app.listen(port, () => {
  console.log("Server listening on port 8080");
});
