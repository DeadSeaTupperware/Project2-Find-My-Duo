// Purpose: Export all models to be used in the application.
// variables
const User = require("./User");
const Game = require("./Game");
const Chatroom = require("./Chatroom");
const Message = require("./Message");

// associations
// user has many games
User.hasMany(Game, {
  // third table to store user's games
  through: {
    model: Game,
    unique: false,
  },
  // alias for the table
  as: "user_games",
});

// game belongs to many users
Game.belongsToMany(User, {
  // third table to store user's games
  through: {
    model: Game,
    unique: false,
  },
  // alias for the table
  as: "game_users",
});

// user has many chatrooms
User.hasMany(Chatroom, {
  // third table to store user's chatrooms
  through: {
    model: Chatroom,
    unique: false,
  },
  // alias for the table
  as: "user_chatrooms",
});

// chatroom belongs to many users
Chatroom.belongsToMany(User, {
  // third table to store user's chatrooms
  through: {
    model: Chatroom,
    unique: false,
  },
  // alias for the table
  as: "chatroom_users",
});

// chatroom has many messages
Chatroom.hasMany(Message, {
  // third table to store chatroom's messages
  through: {
    model: Message,
    unique: false,
  },
  // alias for the table
  as: "chatroom_messages",
});

// exports
module.exports = { User, Game, Chatroom, Message };
