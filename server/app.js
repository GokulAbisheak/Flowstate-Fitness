import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/User.route.js";
import adminRouter from "./routes/Admin.route.js";
import reviewRouter from "./routes/Review.route.js";
//import paymentRouter from "./routes/Payment.route.js";
import paymentRouter from "./routes/Payment.route.js";
import productRouter from "./routes/Product.route.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/review', reviewRouter);
app.use('/product', productRouter);
app.use('/payment', paymentRouter);

export default app;
