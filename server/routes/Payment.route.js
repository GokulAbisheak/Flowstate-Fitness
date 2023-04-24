import express from 'express';
import PaymentController from '../controllers/Payment.controller.js';

const PaymentRouter = express.Router();

PaymentRouter.get('/', PaymentController.getAllPayments);
PaymentRouter.post('/add', PaymentController.createPayment);
PaymentRouter.patch('/update/:id', PaymentController.updatePayment);
PaymentRouter.delete('/delete/:id', PaymentController.deletePayment);
PaymentRouter.get('/:paymentID', PaymentController.getPaymentById);

export default PaymentRouter;