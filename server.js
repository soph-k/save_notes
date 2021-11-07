///////////////////////// Packages /////////////////////////
const express = require("express");
const path = require("path");
const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();


///////////////////////// Middle Ware /////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// Returns a page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/public"))
});


// Listening
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
