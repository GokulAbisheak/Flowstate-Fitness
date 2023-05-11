import Trainerappl from "../models/TrainerAppl.model.js";
import logger from "../utilities/logger.js";

const TrainerApplController = {

    createTrainerAppl: async (req, res) => {
        try {
            const trainerAppl = new Trainerappl(req.body);
            await trainerAppl.save();
            logger.info("Trainer Applicant created successfully");
            res.status(201).json(trainerAppl);
        } catch(error) {
            logger.error("Trainer Applicant create failed");
            res.status(400).json({ message: error.message });
        };
     },
     getTrainerByEmail: async (req, res) => {
        try {
            const trainer = await Trainerappl.findOne({ email: req.params.email });
            if (!trainer) {
                logger.error("Trainer " + req.params.email + " not found");
                return res.status(404).json({ message: 'Trainer not found' });
            }
            res.status(200).json(trainer);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting trainer " + req.params.email);
        }
    },

     //Delete an trainerapp by email
     deleteTrainerAppByEmail: async (req, res) => {
        try {
            const trainerapp = await Trainerappl.findOneAndDelete({ email: req.params.email });
            if (!trainerapp) {
                logger.error("TrainerApp " + req.params.email + " not found");
                return res.status(404).json({ message: 'TrainerApp not found' });
            }
            logger.info("TrainerApp " + req.params.email + " deleted successfully");
            res.status(200).json({ message: 'TrainerApp deleted' });
        } catch (error) {
            logger.error("Error deleting TrainerApp " + req.params.email);
            res.status(400).json({ message: error.message });
        }
    },

    getAllTrainersApp: async (req, res) => {
        try {
            const trainers = await Trainerappl.find();
            res.status(200).json(trainers);
        } catch (error) {
            logger.error("Error getting all trainers");
            res.status(500).json({ message: error.message });
        }
    }
};

export default TrainerApplController;
