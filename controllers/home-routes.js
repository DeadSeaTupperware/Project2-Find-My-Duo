const router = require("express").Router();
const Game = require("../models/Game.js");

// GET Popular games for homepage
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll();
    // const games = gameData.get({plain: true})
    const games = gameData.map(game => game.get({plain: true}))
    console.log(games)
    // Get popular games from DB and render homepage
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
      games
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
    res.render("chatboard");
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
    res.render("chatroom");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for development
router.get("/chatboard/createChatroom/", async (req, res) => {
  try {
    res.render("create_chatroom");
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

router.get("/gameList", async (req, res) => {
  try {
    res.render("gameList");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
