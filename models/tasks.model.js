const { db, DataTypes } = require("../utils/dataBase.util");

const Tasks = db.define("tasks", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  task_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    defaultValue: "pending",
    allowNull: false,
    type: DataTypes.STRING
  }
});

module.exports = { Tasks };