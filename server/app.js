import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/User.route.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

// Add the user routes to the app
app.use('/users', userRouter);


export default app;
