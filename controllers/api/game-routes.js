const router = require("express").Router();
const { Chatroom } = require("../../models");
const Game = require("../../models/Game");
const { Op } = require('sequelize');

// GET all games
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll();
    res.json(gameData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
});

// GET a game by ID
router.get("/:id", async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [{ model: Chatroom }]
    });
    if (!gameData) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const game = gameData.get({plain: true})
    console.log(game)
    res.render('chatboard', { game });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the game' });
  }
});

// CREATE a game
router.post("/", async (req, res) => {
  try {
    const gameData = await Game.create(req.body);
    res.status(201).json(gameData);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the game' });
  }
});

// UPDATE a game
router.put("/:id", async (req, res) => {
  try {
    const gameData = await Game.update(
      {
        title: req.body.title,
        release_date: req.body.release_date,
        description: req.body.description,
        cover_art: req.body.cover_art,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!gameData[0]) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(gameData);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the game' });
  }
});

// DELETE a game
router.delete("/:id", async (req, res) => {
  try {
    const gameData = await Game.destroy({
      where: { id: req.params.id },
    });
    if (!gameData) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the game' });
  }
});

// Search for games
router.get('/search', async (req, res) => {
  try {
      const searchQuery = req.query.q;
      const games = await Game.findAll({
          where: {
              title: {
                  [Op.like]: `%${searchQuery}%`,
              },
          },
      });
      res.render('searchResults', { games, searchQuery });
  } catch (error) {
      res.status(500).json({ error: 'Failed to search games' });
  }
});

module.exports = router;
