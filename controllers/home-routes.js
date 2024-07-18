const router = require("express").Router();
const Game = require("../models/Game.js");
const { Op } = require("sequelize");
const withAuth = require("../utils/auth.js");

// GET Popular games for homepage
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll({
      limit: 4, // Limiting to fetch only four games
    });
    const games = gameData.map((game) => game.get({ plain: true }));

    console.log(games);
    // Get popular games from DB and render homepage
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
      games,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that sends to login page.
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that sends to signup page.
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that finds specific game db and renders to duo finding  page of that game.
router.get("/chatboard", async (req, res) => {
  try {
    const gameData = await Game.findAll();
    const games = gameData.map((game) => game.get({ plain: true }));
    const set = new Set();
    while (set.size < 4) {
      set.add(games[Math.floor(Math.random() * games.length)]);
    }

    const randomGames = Array.from(set);
    res.render("chatboard", { randomGames });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/chatboard/:id", async (req, res) => {
//   try {
//     res.render("chatboard");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/chatboard/:id/chatroom/:roomId", async (req, res) => {
//   try {
//     res.render("chatroom");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Route for development
router.get("/chatboard/chatroom/", async (req, res) => {
  try {
    const gameData = await Game.findAll();
    const games = gameData.map((game) => game.get({ plain: true }));
    const set = new Set();
    while (set.size < 4) {
      set.add(games[Math.floor(Math.random() * games.length)]);
    }

    const randomGames = Array.from(set);
    res.render("chatroom", { randomGames });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for development
router.get("/chatboard/createChatroom/:id", async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);
    if (!gameData) {
      return res.status(404).json({ error: "Game not found" });
    }

    const game = gameData.get({ plain: true });
    console.log(game);
    res.render("create_chatroom", {
      game,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for development
router.get("/gameList/createGame/", async (req, res) => {
  try {
    res.render("create_game");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/gameList", withAuth, async (req, res) => {
  try {
    const gameData = await Game.findAll();
    const games = gameData.map((game) => game.get({ plain: true }));
    const set = new Set();
    while (set.size < 4) {
      set.add(games[Math.floor(Math.random() * games.length)]);
    }

    const randomGames = Array.from(set);
    res.render("gameList", {
      loggedIn: req.session.loggedIn,
      games,
      randomGames,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Search for games
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const gamesData = await Game.findAll({
      where: {
        title: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
    });
    const games = gamesData.map((game) => game.get({ plain: true }));
    res.render("searchResults", { games, searchQuery });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to search games" });
  }
});

module.exports = router;
