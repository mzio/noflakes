const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config");
const routes = require("./routes");
const server = express();

config(server, passport, mongoose);
routes(server, passport);

module.exports = server;
