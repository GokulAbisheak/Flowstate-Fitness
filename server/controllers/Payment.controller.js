import Payment from '../models/Payment.model.js';
import logger from '../utilities/logger.js';

const PaymentController = {

    //Get all payments
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payment.find();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all payments");
        }
    },

    //Create new payment
    createPayment: async (req, res) => {
        try {
            const payment = new Payment(req.body);
            await payment.save();
            res.status(201).json(payment);
            logger.info("Payment create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Payment create failed");
        }
    },

    //Update a payment
    updatePayment: async (req, res) => {
        try {
            const payment = await Payment.findOneAndUpdate(
                {paymentID : req.params.paymentID},
                req.body,
                { new: true }
            );
            logger.info("Payment " + req.params.paymentID + " update successful");
            if (!payment) {
                logger.error("Payment " + req.params.paymentID + " not found");
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Payment " + req.params.paymentID + " update unsuccessful");
        }
    },

    //Delete a payment
    deletePayment: async (req, res) => {
        try {
            const payment = await Payment.findOneAndDelete(req.params.paymentID);
            if (!payment) {
                logger.error("Payment " + req.params.paymentID + " not found");
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json({ message: 'Payment deleted' });
            logger.info("Payment " + req.params.paymentID + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("Payment " + req.params.productID + " deleted nonsuccessfully");
        }
    },
};

export default PaymentController;