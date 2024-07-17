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

// GET one chatroom
// GET /api/chatboard/:id
// authentication required
router.get("/:id", authenticate, async (req, res) => {
  try {
    // get the chatroom data by its id
    const chatroomData = await Chatroom.findByPk(req.params.id, {
      include: [
        {
          model: Message,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    // if no chatroom data found, return 404 status
    if (!chatroomData) {
      res.status(404).json({ message: "No chatroom found with this id!" });
      return;
    }

    // serialize the chatroom data
    const chatroom = chatroomData.get({ plain: true });

    // render the chatroom page with the chatroom data
    res.render("chatroom", {
      ...chatroom,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// export routes
module.exports = router;
