// Purpose: Export all models to be used in the application.
// variables
const sequelize = require("../config/connection");
const User = require("./User");
const Game = require("./Game");
const Chatroom = require("./Chatroom");
const Message = require("./Message");

// associations
// user-message
User.hasMany(Message, { foreignKey: "sender_id" });
Message.belongsTo(User, { foreignKey: "sender_id" });

// chatroom-message
Chatroom.hasMany(Message, { foreignKey: "room_id" });
Message.belongsTo(Chatroom, { foreignKey: "room_id" });

// game-chatroom
Game.hasMany(Chatroom, { foreignKey: "game_id" });
Chatroom.belongsTo(Game, { foreignKey: "game_id" });

// user-game
const UserGame = sequelize.define(
  "usergame",
  {},
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "usergame",
  }
);

User.belongsToMany(Game, { through: UserGame, foreignKey: "user_id" });
Game.belongsToMany(User, { through: UserGame, foreignKey: "game_id" });

// exports
module.exports = { User, Game, Chatroom, Message, UserGame };
