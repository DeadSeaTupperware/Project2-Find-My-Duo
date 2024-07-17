// Purpose: API routes for the application
// variables
const router = require("express").Router();
const { Chatroom } = require("../../models");
const withAuth = require("../../utils/auth.js");

// GET all chatrooms
// GET /api/chatrooms
// authentication required
router.get("/", withAuth, async (req, res) => {
  try {
    // get all chatroom data
    const chatroomData = await Chatroom.findAll();
    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    res.render("chatboard", {
      chatrooms,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one chatroom
// GET /api/chatrooms/:id
// authentication required
router.get("/:id", withAuth, async (req, res) => {
  try {
    // get one chatroom data
    const chatroomData = await Chatroom.findByPk(req.params.id, {
      include: {
        model: "Chatroom",
        include: [Message, User],
      },
    });

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
