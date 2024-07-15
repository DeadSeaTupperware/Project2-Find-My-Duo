// Purpose: To handle the chatroom routes for the API
// variables
const router = require("express").Router();
const { User, Chatroom, Game, Message } = require("../../models");
const authenticate = require("../../utils/auth.js");

// GET all chatrooms
// GET /api/chatrooms
// authentication required
router.get("/", authenticate, async (req, res) => {
  try {
    // get all chatroom data
    const chatroomData = await Chatroom.findAll();
    res.status(200).json(chatroomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a chatroom by id
// GET /api/chatrooms/:id
// authentication required
router.get("/:id", authenticate, async (req, res) => {
  try {
    // get chatroom data by id
    const chatroom = await Chatroom.findByPk(req.params.id, {
      // include user and message data
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Message,
          attributes: [
            "id",
            "room_id",
            "sender_id",
            "message_text",
            "message_timestamp",
          ],
        },
      ],
    });

    // if no chatroom found with this id return 404
    if (!chatroom) {
      res.status(404).json({ message: "No chatroom found with this id!" });
      return;
    }

    res.status(200).json(chatroom);
  } catch (err) {
    res.status(500).json(err);
  }
});

// exports
module.exports = router;
