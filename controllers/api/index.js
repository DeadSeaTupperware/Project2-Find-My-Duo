// Purpose: API routes for the application
// variables
const express = require("express");
const router = express.Router();

// import routes
const authRoutes = require("../../utils/auth.js");
const userRoutes = require("./user-routes");
const gameRoutes = require("./game-routes");
const chatboardRoutes = require("./chatboard-routes");
const chatroomRoutes = require("./chatroom-routes");
const messageRoutes = require("./message-routes");

// use routes
router.use("/users", userRoutes);
router.use("/games", gameRoutes);
router.use("/chatboard", chatboardRoutes);
router.use("/chatrooms", chatroomRoutes);
router.use("/messages", messageRoutes);

// export
module.exports = router;
