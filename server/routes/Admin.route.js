import express from 'express';
import AdminController from '../controllers/Admin.controller.js';

const adminRouter = express.Router();

adminRouter.get('/', AdminController.getAllAdmins);
adminRouter.get('/:id', AdminController.getAdminById);
adminRouter.post('/add', AdminController.createAdmin);
adminRouter.patch('/update/:id', AdminController.updateAdminById);
adminRouter.delete('/delete/:id', AdminController.deleteAdminById);

export default adminRouter;
