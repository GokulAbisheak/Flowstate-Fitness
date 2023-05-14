import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/User.route.js";
import adminRouter from "./routes/Admin.route.js";
import membershipRouter from "./routes/Membership.route.js";
import trainerRouter from "./routes/Trainer.route.js";
import trainerAppRouter from "./routes/TrainerApp.route.js";
import reviewRouter from "./routes/Review.route.js";
import productRouter from './routes/Product.route.js'
import cartRouter from "./routes/Cart.route.js";
import sessionRouter from "./routes/Session.route.js";
import attendanceRouter from "./routes/Attendance.route.js";
import paymentRouter from "./routes/Payment.route.js";
import financeRouter from "./routes/Finance.route.js"
import uploadImage from "./uploadImage.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

//User and Membership Management
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/membership', membershipRouter);

//Trainer Management
app.use('/trainer', trainerRouter);
app.use('/trainer/applicant', trainerAppRouter)

//Customer Relationship Management
app.use('/review', reviewRouter);

//Product Management
app.use('/product', productRouter);
app.use('/cart', cartRouter);

//Personal Training Management
app.use('/session', sessionRouter);
app.use('/attendance', attendanceRouter);

//Payment Management
app.use('/payment', paymentRouter);

//Finance Management
app.use('/finance', financeRouter);

//Upload Image
app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image).then((url) => {
        res.send(url)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

export default app;