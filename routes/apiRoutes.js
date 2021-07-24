const fs = require('fs');
const router = require('express').Router();
let db = require('../db/db.json');
//will read db.json file and will pass it to /notes
router.get('/notes', (req, res) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(db);
})
//this will be the model of what's being added and viewed
router.post('/notes', (req, res) => {
    let noteTemplate = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 1000)
    }
    //Add a new note to the database using writeFileSync
    //api routes using readFileSync & writeFileSync are "controller"
    db.push(noteTemplate)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})
    //Delete a note from the database
router.delete('/notes/:id', (req, res) => {
    const notesToKeep = [];
    for (let i = 0; i < db.length; i++) {
        if (db[i].id != req.params.id) {
            notesToKeep.push(db[i])
        }
    }
    //sets the notes to keep to the database
    db = notesToKeep;
    //repeats write file function after a note is deleted
    fs.writeFileSync('./db/db.json', JSON.stringify(db), function(err, res){
        if (err) {
            throw err
        }
    })
    console.log('delete', db);
    res.json(db)
})


module.exports = router;


