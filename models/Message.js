// model file for messages
// imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Message model
class Message extends Model {}

Message.init(
  {
    // define columns
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // room_id
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "chatroom",
        key: "id",
      },
    },
    // sender_id
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    // message_text
    message_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // message_timestamp
    message_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "message",
  }
);

// export Message model
module.exports = Message;
