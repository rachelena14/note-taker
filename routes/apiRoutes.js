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
    db.push(noteTemplate)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})

router.delete('/notes/:id', (req, res) => {
    const notesToKeep = [];
    for (let i = 0; i < db.length; i++) {
        if (db[i].id != req.params.id) {
            notesToKeep.push(db[i])
        }
    }
    db = notesToKeep;
    fs.writeFileSync('./db/db.json', JSON.stringify(db), function(err, res){
        if (err) {
            throw err
        }
    })
    console.log('delete', db);
    res.json(db)
})


module.exports = router;


//db.json is model
//index.html is view
//api routes using readFileSync & writeFileSync are controller