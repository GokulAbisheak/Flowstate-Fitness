import express from 'express';
import AdminController from '../controllers/Admin.controller.js';

const adminRouter = express.Router();

adminRouter.get('/', AdminController.getAllAdmins);
adminRouter.get('/:email', AdminController.getAdminByEmail);
adminRouter.post('/add', AdminController.createAdmin);
adminRouter.patch('/update/:email', AdminController.updateAdminByEmail);
adminRouter.delete('/delete/:email', AdminController.deleteAdminByEmail);

export default adminRouter;
