import mongoose from "mongoose";
import config from "./config/index.js";

const InitiateDatabaseConnection = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${config.database_user_name}:${config.database_user_password}@store.pmgwc0a.mongodb.net/store`
      )
      .then(() => {
        console.log("Database is online!");
      });
  } catch (error) {
    console.error(error.message);
  }
};

export default InitiateDatabaseConnection;
