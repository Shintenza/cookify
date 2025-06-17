import app from "./app";
import config from "./config/config";
import AppDataSource from "./config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database ready");
    app.listen(config.port, () => {
      console.log("Server is up and running");
    });
  })
  .catch((e) => {
    console.log("Failed to connect with the database");
  });
