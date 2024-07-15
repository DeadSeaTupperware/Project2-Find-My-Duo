const router = require("express").Router();
const Game = require("../../models/Game");

// GET a game
router.get("/", async (req, res) => {
  const gameData = await Game.findAll();
  
  return res.json(bookData);
});

// GET a game by ID
router.get("/:id", async (req, res) => {
  const gameData = await Game.findByPk(req.params.id);
  
  return res.json(gameData);
});

// CREATE a game
router.post("/games", async (req, res) => {
  const gameData = await Game.create(req.body);

  return res.json(gameData);
});



module.exports = router;
