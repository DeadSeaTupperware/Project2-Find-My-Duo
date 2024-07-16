const router = require("express").Router();
const Game = require("../../models/Game");

// GET all games
router.get("/", async (req, res) => {
  const gameData = await Game.findAll();

  return res.json(gameData);
});

// GET a game by ID
router.get("/:id", async (req, res) => {
  const gameData = await Game.findByPk(req.params.id);

  return res.json(gameData);
});

// CREATE a game
router.post("/", async (req, res) => {
  const gameData = await Game.create(req.body);

  return res.json(gameData);
});

// UPDATE a game
router.put("/:id", async (req, res) => {
  const gameData = await Game.update(
    {
      title: req.body.title,
      release_date: req.body.release_date,
      description: req.body.description,
      cover_art: req.body.cover_art,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(gameData);
});

// DELETE a game
router.delete('/:id', async (req, res) => {
  const gameData = await Game.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(gameData);
});

module.exports = router;
