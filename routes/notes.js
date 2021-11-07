///////////////////////// Require Files /////////////////////////
const fs = require("fs");
const dbJson = require("../../soph_save_notes/db/db.json");
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();


///////////////////////// GET Method /////////////////////////
//Gets all old notes
router.get("/", (req, res) => {
    res.json(dbJson);
});

///////////////////////// Post Method /////////////////////////
//Creates a new note
router.post("/", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    dbJson.push(newNote);

    // Writes the updated variable to a JSON string
    fs.writeFile('./db/db.json', JSON.stringify(dbJson), (err) =>{
      err ? console.error(err) : console.log('Success!')
    });
     res.status(201).json(dbJson)
    });

///////////////////////// Delete Method /////////////////////////
//Deletes selected note
router.delete("/:id", (req, res) => {
  const removeNote = req.params.id;
  dbJson = dbJson.filter (note => note.id != removeNote);

  fs.writeFile('./db/db.json', JSON.stringify(globalData), (err) =>{
    err ? console.error(err) : console.log('Success!')
  });
  res.status(201).json(dbJson)
});


//Exports dbJson
module.exports = dbJson;