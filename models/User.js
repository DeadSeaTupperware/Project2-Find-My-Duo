// model file for users
// imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create our User model
class User extends Model {
  // check password method to compare hashed password with entered password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // define columns
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // username must be unique
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // email must be unique and must be a valid email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // password must be at least 8 characters long
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    emergency_key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        // hash the password before creating a new user
        try {
          newUser.password = await bcrypt.hash(newUser.password, 10);
          newUser.emergency_key = await bcrypt.hash(newUser.emergency_key, 10);
          return newUser;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
      beforeUpdate: async (newUser) => {
        // hash the password before updating a user
        try {
          newUser.password = await bcrypt.hash(newUser.password, 10);
          newUser.emergency_key = await bcrypt.hash(newUser.emergency_key, 10);
          return newUser;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    sequelize, // import connection
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user", // model name
  }
);

// export User model
module.exports = User;
