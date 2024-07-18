// Purpose: API routes for the application
// variables
const router = require("express").Router();
const { Chatroom, Game, User } = require("../../models");
const withAuth = require("../../utils/auth.js");
const fs = require("fs");
const path = require("path");

// GET all chatrooms
// GET /api/chatrooms
// authentication required
router.get("/gameList", withAuth, async (req, res) => {
  try {
    const gameData = await Game.findAll();
    const games = gameData.map((game) => game.get({ plain: true }));
    console.log("Games:", games);

    const chatroomData = await Chatroom.findAll();
    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    // Read chatroomData.json
    const chatroomDataPath = path.join(
      __dirname,
      "../../data/chatroomData.json"
    );
    const chatroomDataJson = fs.readFileSync(chatroomDataPath);
    const chatroomDataArray = JSON.parse(chatroomDataJson);

    const currentUser = req.user;

    // Console log for debugging
    console.log("Games:", games);
    console.log("Chatrooms:", chatrooms);
    console.log("Chatroom Data from JSON:", chatroomData);
    console.log("Current User:", currentUser);

    res.render("gameList", {
      currentUser,
      games,
      chatrooms,
      chatroomDataArray,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET one chatroom
// GET /api/chatrooms/:id
// authentication required
router.get("/:id", withAuth, async (req, res) => {
  try {
    const chatroomData = await Chatroom.findByPk(req.params.id, {
      include: [Message, User],
    });

    const chatroom = chatroomData.get({ plain: true });

    res.render("chatroom", {
      chatroom,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// export routes
module.exports = router;
