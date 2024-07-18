const sequelize = require("../config/connection");
const { User, Game, Chatroom } = require("../models");

const userData = require("./userData.json");
const gameData = require("./gameData.json");
const chatroomData = require("./chatroomData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (let i = 0; i < gameData.length; i++) {
    await Game.create(gameData[i], {
      individualHooks: true,
      returning: true,
    });
  }

  await Chatroom.bulkCreate(chatroomData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
