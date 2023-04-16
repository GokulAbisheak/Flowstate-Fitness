import express from 'express';
import TrainerController from '../controllers/Trainer.controller.js';

const trainerRouter = express.Router();

trainerRouter.get('/get', TrainerController.getAllTrainers);
trainerRouter.get('/get/:email', TrainerController.getTrainerByEmail);
trainerRouter.post('/add', TrainerController.createTrainer);
trainerRouter.patch('/update/:email', TrainerController.updateTrainerByEmail);
trainerRouter.delete('/delete/:email', TrainerController.deleteTrainerByEmail);

export default trainerRouter;

