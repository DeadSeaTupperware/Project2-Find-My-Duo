// Purpose: To handle the chatroom routes for the API
// variables
const router = require("express").Router();
const { User, Chatroom, Message } = require("../../models");
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
    // Purpose: render dynamic chatroom page
    // get chatroom data by id
    const chatroomData = await Chatroom.findByPk(req.params.id, {
      // include user and message data
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

    // if no chatroom found with this id return 404
    if (!chatroomData) {
      res.status(404).json({ message: "No chatroom found with this id!" });
      return;
    }

    // serialize the chatroom data
    const chatroom = chatroom.get({ plain: true });

    // render the chatroom page with the chatroom data
    res.render("chatroom", {
      // spread the chatroom data
      ...chatroom,
      // map over the messages and add the username to each message
      messages: chatroom.messages.map((message) => ({
        // spread the message data
        ...message,
        // add the username to the message data
        username: message.user.username,
      })),
      // add the user id to the chatroom data
      user: req.session.user_id,
    });
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

// DELETE a chatroom by id
// DELETE /api/chatrooms/:id
// authentication required
router.delete("/:id", authenticate, async (req, res) => {
  try {
    // delete a chatroom by id
    const chatroom = await Chatroom.destroy({
      where: {
        id: req.params.id,
      },
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
