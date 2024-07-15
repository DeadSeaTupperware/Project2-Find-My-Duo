const router = require("express").Router();

// GET Popular games for homepage
router.get("/", async (req, res) => {
  try {
    // Get popular games from DB and render homepage
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that sends to login page.
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that sends to signup page.
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that finds specific game db and renders to duo finding  page of that game.
router.get("/chatboard", async (req, res) => {
  try {
    res.render("chatboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/gameList", async (req, res) => {
  try {
    res.render("gameList");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
