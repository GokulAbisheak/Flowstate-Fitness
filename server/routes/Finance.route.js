import express from 'express';
import FinanceController from '../controllers/Finance.controller.js';

const financeRouter = express.Router();

financeRouter.get('/', FinanceController.getAllFinances);
financeRouter.get('/:salaryID', FinanceController. getFinanceById);
financeRouter.post('/add', FinanceController.createFinance);
financeRouter.patch('/update/:salaryID', FinanceController.updateFinanceByID);
financeRouter.delete('/delete/:salaryID', FinanceController.deleteFinanceByID);

export default financeRouter;
