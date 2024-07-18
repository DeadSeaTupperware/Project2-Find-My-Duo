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
    // game relationship
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "game",
        key: "id",
      },
    },
    // chatroom password must be at least 8 characters long
    // chatroom_password: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //     len: [8],
    //   },
    // },
  },
  {
    // hooks: {
    //   beforeCreate: async (newChatroom) => {
    //     // hash the password before creating a new chatroom
    //     try {
    //       newChatroom.chatroom_password = await bcrypt.hash(
    //         newChatroom.chatroom_password,
    //         10
    //       );
    //       return newChatroom;
    //     } catch (err) {
    //       console.log(err);
    //       return err;
    //     }
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "chatroom",
  }
);

// export Chatroom model
module.exports = Chatroom;
