// Ensures express and the routes are being utilized

require('dotenv').config();
const express = require('express'); 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Designates which routes the data will follow 
app.use('/api', apiRoutes);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });
  

app.use('/', htmlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops! I think something went wrong!');
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;