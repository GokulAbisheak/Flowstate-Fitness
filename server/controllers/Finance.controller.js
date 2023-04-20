import Finance from '../models/Finance.model.js';
import logger from '../utilities/logger.js';

const FinanceController = {

    //Get all finances
    getAllFinances: async (req, res) => {
        try {
            const finances = await Finance.find();
            res.status(200).json(finances);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all finances");
        }
    },

    //Get finances by id
    getFinanceById: async (req, res) => {
        try {
            const finance = await Finance.findOne({salaryID : req.params.salaryID});
            if (!finance) {
                logger.error("Salary " + req.params.salaryID + " not found");
                return res.status(404).json({ message: 'Salary not found' });
            }
            res.status(200).json(finance);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting finance " + req.params.salaryID);
        }
    },

    //Create new finance
    createFinance: async (req, res) => {
        try {
            logger.info(req.body)
            const { salaryID, firstName, lastName, department, lastUpdated, salary,frequency, url } = req.body;

           
            const finance = new Finance({

                salaryID, 
                firstName, 
                lastName, 
                department, 
                lastUpdated, 
                salary,
                frequency, 
                url,

            });
            await finance.save();
            res.status(201).json(finance);
            logger.info("Finance create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Finance create failed");
        }
    },

    //Update a finance
    updateFinanceByID: async (req, res) => {
        try {
            const finance = await Finance.findOneAndUpdate(
                {salaryID : req.params.salaryID},
                req.body,
                { new: true }
            );
            logger.info("Salary " + req.params.salaryID + " update successful");
            if (!finance) {
                logger.error("Salary " + req.params.salaryID + " not found");
                return res.status(404).json({ message: 'Salary not found' });
            }
            res.status(200).json(finance);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Finance " + req.params.salaryID + " update unsuccessful");
        }
    },

    //Delete a finance
    deleteFinanceByID: async (req, res) => {
        try {
            const finance = await Finance.findOneAndDelete(req.params.paymentID);
            if (!finance) {
                logger.error("Salary " + req.params.salaryID + " not found");
                return res.status(404).json({ message: 'Salary not found' });
            }
            res.status(200).json({ message: 'Salary deleted' });
            logger.info("Salary " + req.params.salaryID + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("Salary " + req.params.salaryID + " deleted successfully");
        }
    },
};

export default FinanceController;
