import app from "./app.js";

import { createServer } from "http";

import logger from "./core/logger/winston.logger.js";
import morganMiddleware from "./core/logger/morgan.logger.js";
import env from "./core/config/env.js";

const httpServer = createServer(app);

app.use(morganMiddleware);

const startServer = () => {
  httpServer.listen(env.PORT || 8090, () => {
    logger.info("⚙️  Server is running on port: " + process.env.PORT);
  });
};

startServer();

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection: " + err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception: " + err);
  process.exit(1);
});