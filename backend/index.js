const express = require("express");
const passport = require("passport");
const config = require("./config");
const routes = require("./routes");
const server = express();

config(server, passport);
routes(server, passport);

module.exports = server;
