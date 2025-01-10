const path = require('path');
const router = require('express').Router();

// When /notes is accessed, this will render notes.html file
router.get('/notes', (req, res) => {
    console.log(`Request URL: ${req.url}`);
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// When any other route is accessed, will render index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;

