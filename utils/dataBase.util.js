const { Sequelize, DataTypes } = require("sequelize");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const db = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "L13150698o",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB || "TasksCRUD",
  logging: false
});

module.exports = { db, DataTypes };