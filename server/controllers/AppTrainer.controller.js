import TrainerApp from '../models/TrainerApp.model';


const TrainerAppController = {

        //Create a new trainerapp
        createTrainerApp: async (req, res) => {
            try {
                const trainerapp = new TrainerApp(req.body);
                await trainerapp.save();
                res.status(201).json(trainerapp);
                logger.info("TrainerApp create successful");
            } catch (error) {
                res.status(400).json({ message: error.message });
                logger.error("TrainerApp create failed");
            }
        },

        //Delete an trainerapp by email
    deleteTrainerAppByEmail: async (req, res) => {
        try {
            const trainerapp = await TrainerApp.findOneAndDelete({ email: req.params.email });
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
    }


};
