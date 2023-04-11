import express from 'express';
import UserController from '../controllers/User.controller.js';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:email', UserController.getUserByEmail);
userRouter.post('/add', UserController.createUser);
userRouter.patch('/update/:email', UserController.updateUserByEmail);
userRouter.delete('/delete/:email', UserController.deleteUserByEmail);

export default userRouter;
