// model file for chatboards
// imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Chatboard extends Model {}

Chatboard.init(
  {
    // define columns
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // chatboard name
    chatboard_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // game id to associate chatboard with a game
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "game",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "chatboard",
  }
);

// export Chatboard model
module.exports = Chatboard;
