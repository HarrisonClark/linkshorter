const express = require("express");
const app = express();
require("dotenv").config();
const { Sequelize } = require("sequelize");

const run = async () => {
  const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
    }
  );

  await sequelize.authenticate();
  console.log("All good!");

  const Order = sequelize.define("order", {
    date: {
      type: Sequelize.DATE,
      default: new Date(),
      allowNull: false,
    },
    person: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
  });
  console.log("Order has been defined!");

  await sequelize.sync();
  console.log("Succesfully synced!");
};

run().catch((error) => console.log(error));
app.post("/api/create/:url", (req, res) => {
  const { prefUrl } = req.body;
  // create a link
});

app.get("/api/info/:shortUrl", (req, res) => {
  // give stats on a shortened URL
});

app.get("/:shortUrl", (req, res) => {
  // forward to a short URL
});
