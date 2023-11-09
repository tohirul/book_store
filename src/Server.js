import http from "http";
import config from "./config/index.js";
import InitiateDatabaseConnection from "./Database.Connect.js";
import Application from "./App.js";

const app = Application;
const port = config.port;

let server = http.server;

const InitializeServer = async () => {
  try {
    await InitiateDatabaseConnection().then(() => {
      server = app.listen(port, () => {
        console.log(`listening on port ${port}`);
      });
    });
  } catch (error) {
    console.error(error.message);
  }
};

InitializeServer();
