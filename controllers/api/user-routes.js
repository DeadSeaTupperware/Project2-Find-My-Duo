// Purpose: To handle the user routes for the API
// variables
const router = require("express").Router();
const { User, Chatroom, Game, Message } = require("../../models");
const authenticate = require("../../utils/auth.js");

// GET all users
// GET /api/users
// authentication required
router.get("/", authenticate, async (req, res) => {
  try {
    // get all user data except for the password and emergency key
    const userData = await User.findAll({
      attributes: { exclude: ["password", "emergency_key"] },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a user by id
// GET /api/users/:id
// authentication required
router.get(":/id", authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "emergency_key"] },
      include: [
        {
          model: Chatroom,
          attributes: ["id", "chatroom_name"],
        },
        {
          model: Game,
          attributes: ["id", "game_name"],
        },
      ],
    });

    // if no user found with this id return 404
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// exports
module.exports = router;
