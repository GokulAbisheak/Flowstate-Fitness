import express from 'express';
import UserController from '../controllers/User.controller.js';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/add', UserController.createUser);
userRouter.patch('/update/:id', UserController.updateUserById);
userRouter.delete('/delete/:id', UserController.deleteUserById);

export default userRouter;
