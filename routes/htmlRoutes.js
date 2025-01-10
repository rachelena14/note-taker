const path = require('path');
const router = require('express').Router();

// When /notes is accessed, this will render notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'), (err) => {
        if (err) {
            res.status(500).send('Error loading notes.html');
        }
    });
});

// When any other route is accessed, will render index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
        if (err) {
            res.status(500).send('Error loading index.html');
        }
    });
});

module.exports = router;

