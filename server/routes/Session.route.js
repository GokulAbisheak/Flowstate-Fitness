import express from "express";
import SessionController from '../controllers/SessionController.js';

const sessionRouter = express.Router();

sessionRouter.get('/', SessionController.getAllSessions);
sessionRouter.post('/add', SessionController.addSession);
sessionRouter.patch('/update/:id', SessionController.updateSessionById);
sessionRouter.delete('/delete/:id', SessionController.deleteSessionById);


export default sessionRouter;