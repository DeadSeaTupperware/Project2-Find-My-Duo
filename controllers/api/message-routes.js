// Purpose: To handle the message routes for the API
// variables
const router = require("express").Router();
const { User, Chatroom, Game, Message } = require("../../models");
const authenticate = require("../../utils/auth.js");

// GET all messages
// GET /api/messages
// authentication required
router.get("/", authenticate, async (req, res) => {
  try {
    // get all message data including user and chatroom data
    const messageData = await Message.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Chatroom,
          attributes: ["id", "chatroom_name"],
        },
      ],
    });

    res.status(200).json(messageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a message by id
// GET /api/messages/:id
// authentication required
router.get("/:id", authenticate, async (req, res) => {
  try {
    // get message data by id including user and chatroom data
    const message = await Message.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Chatroom,
          attributes: ["id", "chatroom_name"],
        },
      ],
    });

    // if no message found with this id return 404
    if (!message) {
      res.status(404).json({ message: "No message found with this id!" });
      return;
    }

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new message
// POST /api/messages
// authentication required
router.post("/", authenticate, async (req, res) => {
  try {
    // create a new message with the message data
    const newMessage = await Message.create({
      message_text: req.body.message_text,
      sender_id: req.session.sender_id,
      room_id: req.body.room_id,
    });

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a message by id
// DELETE /api/messages/:id
// authentication required
router.delete("/:id", authenticate, async (req, res) => {
  try {
    // delete a message by id
    const messageData = await Message.destroy({
      where: {
        id: req.params.id,
        sender_id: req.session.sender_id,
      },
    });

    // if no message found with this id return 404
    if (!messageData) {
      res.status(404).json({ message: "No message found with this id!" });
      return;
    }

    res.status(200).json(messageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// export the router
module.exports = router;
