// Purpose: To handle the chatroom routes for the API
// variables
const router = require("express").Router();
const { User, Chatroom, Game, Message } = require("../../models");
const authenticate = require("../../utils/auth.js");

// exports
module.exports = router;
