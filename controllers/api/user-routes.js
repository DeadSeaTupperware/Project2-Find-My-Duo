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
      attributes: { exclude: ["password"] },
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
    // get user data by id except for the password and emergency key
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      // include chatroom and game data
      include: [
        {
          model: Chatroom,
          attributes: ["id", "chatroom_name"],
        },
        {
          model: Game,
          attributes: ["id", "title"],
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

// POST a new user
// POST /api/users
router.post("/", async (req, res) => {
  try {
    // create a new user with the user data
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      // emergency_key: req.body.emergency_key,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT (update) a user by id
// PUT /api/users/:id
// authentication required
router.put("/:id", authenticate, async (req, res) => {
  try {
    // update user data by id
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true, // ensure the password is hashed before updating
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

// DELETE a user by id
// DELETE /api/users/:id
// authentication required
router.delete("/:id", authenticate, async (req, res) => {
  try {
    // delete user data by id
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
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

// POST a user login
// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    // get user data by email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // if no user found with this email return 404
    if (!user) {
      res.status(404).json({ message: "No user found with this email!" });
      return;
    }

    // check if the password is correct
    const validPassword = await user.checkPassword(req.body.password);

    // if the password is incorrect return 400
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    // create a session
    req.session.save(() => {
      // save the user id and logged in status
      req.session.user_id = user.id;
      req.session.loggedIn = true;

      // return the user data and a message
      res.status(200).json({ user: user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a user logout
// POST /api/users/logout
router.post("/logout", async (req, res) => {
  // check if the user is logged in
  if (req.session.loggedIn) {
    // if logged in destroy the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// exports
module.exports = router;
