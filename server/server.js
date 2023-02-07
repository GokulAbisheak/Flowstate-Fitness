import app from "./app.js";
import logger from "./utilities/logger.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    logger.info(`Server has started and running on PORT ${PORT}`);
    connectDatabase();
  });