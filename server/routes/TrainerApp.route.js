import express from 'express';
import TrainerAppController from '../controllers/TrainerAppl.Controller.js';


const trainerAppRouter = express.Router();

// Route to approve an applicant
trainerAppRouter.post('/add', TrainerAppController.createTrainerAppl);
trainerAppRouter.delete('/delete/:email',TrainerAppController.deleteTrainerAppByEmail);
trainerAppRouter.get('/get', TrainerAppController.getAllTrainersApp);

export default trainerAppRouter;
