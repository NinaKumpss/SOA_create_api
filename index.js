const express = require('express'); //represents the actual api
const app = express();
const mongoose = require('mongoose');

const DATABASE_URL = "mongodb://localhost/games"

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

// parsing of json objects in the body
app.use(express.json());

app.listen(8080, () => console.log('Server started'));

const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter)
