const sequelize = require("../config/connection");
const { User, Game, Chatroom } = require("../models");

const userData = require("./userData.json");
const gameData = require("./gameData.json");
const chatroomData = require("./gameData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Game.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });

  await Chatroom.bulkCreate(chatroomData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
