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

// POST a new chatroom
// POST /api/chatrooms
// authentication required
router.post("/", authenticate, async (req, res) => {
  try {
    // create a new chatroom with the chatroom data
    const newChatroom = await Chatroom.create({
      chatroom_name: req.body.chatroom_name,
      chatroom_password: req.body.chatroom_password,
    });

    res.status(200).json(newChatroom);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT (update) a chatroom by id
// PUT /api/chatrooms/:id
// authentication required
router.put("/:id", authenticate, async (req, res) => {
  try {
    // update a chatroom by id
    const updatedChatroom = await Chatroom.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // if no chatroom found with this id return 404
    if (!updatedChatroom) {
      res.status(404).json({ message: "No chatroom found with this id!" });
      return;
    }

    res.status(200).json(updatedChatroom);
  } catch (err) {
    res.status(500).json(err);
  }
});

// exports
module.exports = router;
