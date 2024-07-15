const router = require("express").Router();
const Game = require("../../models/Game");

// CREATE a game
router.post("/games", async (req, res) => {
  const gameData = await Game.create(req.body);

  return res.json(gameData);
});

module.exports = router;
