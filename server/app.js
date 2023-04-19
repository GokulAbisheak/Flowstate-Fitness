import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/User.route.js";
import adminRouter from "./routes/Admin.route.js";
import reviewRouter from "./routes/Review.route.js";
<<<<<<< HEAD
//import paymentRouter from "./routes/Payment.route.js";
import paymentRouter from "./routes/Payment.route.js";
import productRouter from "./routes/Product.route.js";
=======
import membershipRouter from "./routes/Membership.route.js";
import productRouter from "./routes/Product.route.js";
import financeRouter from "./routes/Finance.route.js"
import uploadImage from "./uploadImage.js";
>>>>>>> 476d25d56680d118a41cda4567b1598d3b81f889

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/membership', membershipRouter);
app.use('/review', reviewRouter);
app.use('/product', productRouter);
<<<<<<< HEAD
app.use('/payment', paymentRouter);
=======
app.use('/finance',financeRouter);


app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image).then((url) => {
        res.send(url)
    }).catch((err) => {
        res.status(500).send(err)
    })
})
>>>>>>> 476d25d56680d118a41cda4567b1598d3b81f889

export default app;
