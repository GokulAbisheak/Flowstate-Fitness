import express from 'express';
import UserController from '../controllers/User.controller.js';
import protect from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', protect, UserController.getAllUsers);
userRouter.get('/:email', UserController.getUserByEmail);
userRouter.get('/auth/me', UserController.getMe);
userRouter.get('/search/byemail', protect, UserController.searchUser);
userRouter.post('/add', UserController.createUser);
userRouter.patch('/update/:email', protect, UserController.updateUserByEmail);
userRouter.patch('/changepassword/:email', UserController.changePassword);
userRouter.delete('/delete/:email', protect, UserController.deleteUserByEmail);
userRouter.post('/login', UserController.loginUser);

export default userRouter;
