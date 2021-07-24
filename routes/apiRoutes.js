const fs = require('fs');
const router = require('express').Router();
let db = require('../db/db.json');
//will read db.json file and will pass it to /notes
router.get('/notes', (req, res) => {
  let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')); 
  res.json(db);
})

module.exports = router;