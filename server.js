const { app } = require("./app");
const { db } = require("./utils/dataBase.util");
const { initialModels } = require("./models/initialModels");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const startServer = async () => {
  try {
    await db.authenticate();

    initialModels();

    await db.sync();

    app.listen(process.env.PORT || process.env.PORT_LISTENER, () => {
      console.log(`Express App runing in port: ${process.env.PORT_LISTENER}.`);
    })
  } catch (error) {
    console.log(error);
  }
};

startServer();