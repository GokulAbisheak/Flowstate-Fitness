import { validationResult } from 'express-validator';

const TrainerController = {
  createTrainer: async (req, res) => {
    try {
      // Define validation rules using express-validator
      const { body } = req;
      await body('email').isEmail().normalizeEmail().run(req);
      await body('password').isLength({ min: 8 }).run(req);
      await body('phoneNumber').isMobilePhone().run(req);

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Create a new trainer if input is valid
      const trainer = new Trainer(body);
      await trainer.save();

      res.status(201).json(trainer);
      logger.info('Trainer create successful');
    } catch (error) {
      res.status(400).json({ message: error.message });
      logger.error('Trainer create failed');
    }
  },
};
