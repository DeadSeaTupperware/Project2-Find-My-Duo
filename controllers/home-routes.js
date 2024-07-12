const router = require("express").Router();

// GET Popular games for homepage
router.get("/", async (req, res) => {
  try {
    // Get popular games from DB and render homepage
    res.render("homepage");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that sends to login page.
router.get("/login", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that sends to signup page.
router.get("/signup", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET req that finds specific game db and renders to duo finding  page of that game.
router.get("/signup", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
