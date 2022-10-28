const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    hours_played: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Game', gameSchema);