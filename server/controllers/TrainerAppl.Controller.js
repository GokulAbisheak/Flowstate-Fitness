import Trainerappl from "../models/TrainerAppl.model.js"

const TrainerApplController = {

    createTrainerAppl : async (req, res) => {
        try{
            const trainerAppl = new Trainerappl(req.body);
            await trainerAppl.save();
            res.status(201).json(trainerAppl);
            logger.info("Trainer Applicant created successfully");
        }catch(error){
            res.status(400).json({ message: error.message });
            logger.error("Trainer Applicant create failed");
        };
     },

     //Delete an trainerapp by email
     deleteTrainerAppByEmail: async (req, res) => {
        try {
            const trainerapp = await Trainerappl.findOneAndDelete({ email: req.params.email });
            if (!trainerapp) {
                logger.error("TrainerApp " + req.params.email + " not found");
                return res.status(404).json({ message: 'TrainerApp not found' });
            }
            res.status(200).json({ message: 'TrainerApp deleted' });
            logger.info("TrainerApp " + req.params.email + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("TrainerApp " + req.params.email + " deleted successfully");
        }
    },

    getAllTrainersApp: async (req, res) => {
        try {
            const trainers = await Trainerappl.find();
            res.status(200).json(trainers);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all trainers");
        }
    }

};

export default TrainerApplController;
