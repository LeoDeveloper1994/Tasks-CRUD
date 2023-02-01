const { Users } = require("./users.model");
const { Tasks } = require("./tasks.model");

const initialModels = () => {
  Users.hasMany(Tasks, { foreignKey: "user_id" });
};

module.exports = { initialModels };