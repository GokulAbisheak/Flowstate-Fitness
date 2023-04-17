import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/User.route.js";
import adminRouter from "./routes/Admin.route.js";
import reviewRouter from "./routes/Review.route.js";
import trainerRouter from "./routes/Trainer.route.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Add console.log statement here
console.log('Middleware applied');

app.get('/', (req, res) => {
    // Add console.log statement here
    console.log('Request received at root endpoint');
    res.send('Server is Running! 🚀');
})

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/review', reviewRouter);
app.use('/trainer', trainerRouter);

// Add console.log statement here
console.log('Routers assigned');

export default app;
