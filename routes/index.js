///////////////////////// Packages /////////////////////////
const express = require("express");
const app = express();

///////////////////////// Require Files /////////////////////////
const notes = require("./notes");

app.use("/notes", notes);

//Exports app
module.exports = app;