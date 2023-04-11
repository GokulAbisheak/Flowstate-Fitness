import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/User.route.js";
import adminRouter from "./routes/Admin.route.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

app.use('/user', userRouter);
app.use('/admin', adminRouter);

export default app;
