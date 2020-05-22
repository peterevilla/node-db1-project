const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const AccountsRouter = require('../routes/account-routes')

server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});


module.exports = server;
