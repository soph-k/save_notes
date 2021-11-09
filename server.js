///////////////////////// Packages /////////////////////////
//NodeJS
const fs = require("fs");
const path = require("path");

// Express
const express = require("express");

// UUID 
const { v4: uuidv4 } = require('uuid');

//Linking database
const dbJson = require('./db/db.json');

//Defining Port
const PORT = process.env.PORT || 3001;

const app = express();


///////////////////////// Middle Ware /////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


///////////////////////// Pages /////////////////////////
// Homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// Notepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
)

///////////////////////// GET Method /////////////////////////
//Get home page
app.get("/", (req, res) => {
  res.json(dbJson);
});

// Get all of the old notes
app.get("/notes", (req, res) => {
  res.json(dbJson);
});

///////////////////////// Post Method /////////////////////////
//Creates a new note
app.post("/notes", (req, res) => {
  req.body.id = uuidv4();
  dbJson.push(req.body);

  fs.writeFile('./db/db.json', JSON.stringify(dbJson), (err) =>{
    err ? console.error(err) : console.log('YaY!')
  });
    res.status(201).json(dbJson)
});

///////////////////////// Delete Method /////////////////////////
//Deletes selected note
app.delete("/notes/:id", (req, res) => {
  dbJson = dbJson.filter (note => note.id != req.params.id);

  fs.writeFile('./db/db.json', JSON.stringify(dbJson), (err) =>{
    err ? console.error(err) : console.log('YaY')
  });
  res.status(201).json(dbJson)
});


// Listening
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
