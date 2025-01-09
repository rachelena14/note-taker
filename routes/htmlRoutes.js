const path = require('path');
const router = require('express').Router();
//when localhost is accessed, will render notes.html file
router.get('/notes.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})
//when localhost is accessed, will render index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router;

