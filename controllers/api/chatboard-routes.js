// Purpose: API routes for the application
// variables
const router = require("express").Router();
const { Chatroom, Message, User } = require("../../models");
const authenticate = require("../../utils/auth.js");

// GET all chatboard
// GET /api/chatboard
// authentication required
router.get("/", authenticate, async (req, res) => {
  try {
    // get all chatroom data
    const chatboardData = await Chatroom.findAll();
    // use map to serialize the chatboard data
    const chatboard = chatboardData.map((chatroom) =>
      // get the chatroom data and return it as an object
      chatroom.get({ plain: true })
    );

    // render the chatboard page with the chatboard data
    res.render("chatboard", {
      chatboard,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one chatboard
// GET /api/chatboard/:id
// authentication required
router.get("/:id", authenticate, async (req, res) => {
  // get the chatboard data by its id
  try {
    const chatboardData = await Chatroom.findByPk(req.params.id, {
      include: [
        {
          model: Message,
          include: User,
        },
      ],
    });

    // if the chatroom data is not found, return an error
    if (!chatboardData) {
      res.status(404).json({ message: "chatboardData not found" });
      return;
    }

    // serialize the chatroom data
    const chatboard = chatboardData.get({ plain: true });

    // render the chatboard page with the chatroom data
    res.render("chatboard", {
      chatboard,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

res.render;
// export routes
module.exports = router;
