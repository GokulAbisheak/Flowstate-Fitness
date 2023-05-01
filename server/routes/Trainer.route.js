import express from 'express';
import TrainerController from '../controllers/Trainer.controller.js';

const trainerRouter = express.Router();

trainerRouter.get('/', TrainerController.getAllTrainers);
trainerRouter.get('/:email', TrainerController.getTrainerByEmail);
trainerRouter.post('/', TrainerController.createTrainer);
trainerRouter.patch('/:email', TrainerController.updateTrainerByEmail);
trainerRouter.delete('/:email', TrainerController.deleteTrainerByEmail);

export default trainerRouter;

