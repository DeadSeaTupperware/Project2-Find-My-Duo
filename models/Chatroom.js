// model file for chatrooms
// imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Chatroom model
class Chatroom extends Model {}

Chatroom.init(
  {
    // define columns
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // chatroom name must be unique
    chatroom_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // chatroom password must be at least 8 characters long
    chatroom_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "chatroom",
  }
);

// export Chatroom model
module.exports = Chatroom;
