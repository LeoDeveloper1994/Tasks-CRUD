const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "127.0.0.1",
  username: "postgres",
  password: "L13150698o",
  port: 5432,
  database: "Tasks CRUD",
  logging: false
});

module.exports = { db, DataTypes };