// model file for chatboards
// imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Chatboard extends Model {}

// export Chatboard model
module.exports = Chatboard;
