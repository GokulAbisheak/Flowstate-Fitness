import Trainer from '../models/Trainer.model';
import logger from '../utilities/logger.js';

const TrainerController = {
    
    //Get all trainers
    getAllTrainers: async (req, res) => {
        try {
            const trainers = await Trainer.find();
            res.status(200).json(trainers);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all trainers");
        }
    },

    //Get Trainers by email
    getTrainerByEmail: async (req, res) => {
        try {
            const trainer = await Trainer.findOne({ email: req.params.email });
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

    //Create a new trainer
    createTrainer: async (req, res) => {
        try {
            const trainer = new Trainer(req.body);
            await trainer.save();
            res.status(201).json(trainer);
            logger.info("Trainer create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Trainer create failed");
        }
    },

    //Update an trainer by email
    updateTrainerByEmail: async (req, res) => {
        try {
            const trainer = await Trainer.findOneAndUpdate(
                { email: req.params.email },
                req.body,
                { new: true }
            );
            logger.info("Trainer " + req.params.email + " update successful");
            if (!trainer) {
                logger.error("Trainer " + req.params.email + " not found");
                return res.status(404).json({ message: 'Trainer not found' });
            }
            res.status(200).json(trainer);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Trainer " + req.params.email + " update unsuccessful");
        }
    },

    //Delete an trainer by email
    deleteTrainerByEmail: async (req, res) => {
        try {
            const trainer = await Trainer.findOneAndDelete({ email: req.params.email });
            if (!trainer) {
                logger.error("Trainer " + req.params.email + " not found");
                return res.status(404).json({ message: 'Trainer not found' });
            }
            res.status(200).json({ message: 'Trainer deleted' });
            logger.info("Trainer " + req.params.email + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("Trainer " + req.params.email + " deleted successfully");
        }
    }
};

export default TrainerController;

