
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Use UUID for unique IDs

const dbPath = path.join(__dirname, '../db/db.json');

// Helper function to read the database
const readDatabase = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write to the database
const writeDatabase = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET /api/notes - Read all notes
router.get('/notes', (req, res) => {
    try {
        const db = readDatabase();
        res.json(db);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read notes' });
    }
});

// POST /api/notes - Add a new note
router.post('/notes', (req, res) => {
    try {
        const db = readDatabase();
        const noteTemplate = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4() // Generate a unique ID
        };
        db.push(noteTemplate);
        writeDatabase(db);
        res.status(201).json(noteTemplate); // Return 201 status code
    } catch (err) {
        res.status(500).json({ error: 'Failed to add note' });
    }
});

// DELETE /api/notes/:id - Delete a note
router.delete('/notes/:id', (req, res) => {
    try {
        let db = readDatabase();
        db = db.filter(note => note.id !== req.params.id);
        writeDatabase(db);
        res.json({ message: 'Note deleted', db });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;