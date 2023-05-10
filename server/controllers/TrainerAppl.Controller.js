import Trainerappl from "../models/TrainerAppl.model"

const TrainerApplController = {

    createTrainerAppl : async (res,req) => {
        try{
            const trainerAppl = new Trainerappl(req.body);
            await trainerAppl.save();
            res.status(201).json(trainerAppl);
            logger.info("Trainer Applicant created successfully");
        }catch(error){
            res.status(400).json({ message: error.message });
            logger.error("Trainer Applicant create failed");
        }
    }

};

export default TrainerApplController;