import app from "./app.js";
import logger from "./utilities/logger.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 8090;

const trainerRouter = require("../server/routes/Trainer"); 
app.use ("/trainer",trainerRouter);
http://localhost:8090/trainer

app.listen(PORT, () => {
    logger.info(`Server has started and running on PORT ${PORT}`);
    connectDatabase();
  });