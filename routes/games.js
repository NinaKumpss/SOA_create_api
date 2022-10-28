const express = require('express');
const game = require('../modules/game');
const router = express.Router();
const Game = require('../modules/game')

// get all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find()
        res.send(games)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
});

// get 1 game by id, : = parameter
router.get('/:id', getGame, (req, res) => {
    res.send(res.game)
});

// add game
router.post('/', async (req, res) => {
    try {
        const game = new Game(req.body);
        const newGame = await game.save();
        // 201 = successfully added
        res.status(201).send(newGame);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
});

router.put('/:id', getGame, async (req, res) => {
    try {
        const game = Game(req.body)
        const updatedGame = await game.save()
        res.send(updatedGame)
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.delete('/:id', getGame, async (req, res) => {
    try {
        await res.game.remove()
        res.send({ message: 'Game deleted' })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

async function getGame(req, res, next) {
    let game
    try {
        game = await Game.findById(req.params.id)
        if (game === null) {
            return res.status(404).send({ message: 'Cannot find game with given id' })
        }
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
    res.game = game
    next()
}

module.exports = router