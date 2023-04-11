import User from '../models/User.model.js';
import logger from '../utilities/logger.js';

const UserController = {
    
    //Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all users");
        }
    },

    //Get user by email
    getUserByEmail: async (req, res) => {
        try {
            const user = await User.findOne({ email : req.params.email });
            if (!user) {
                logger.error("User " + req.params.email + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting user " + req.params.email);
        }
    },

    //Create a new user
    createUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);
            logger.info("User create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("User create failed");
        }
    },

    //Update a user by email
    updateUserByEmail: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                req.params.email,
                req.body,
                { new: true }
            );
            logger.info("User " + req.params.email + " update successful");
            if (!user) {
                logger.error("User " + req.params.email + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("User " + req.params.email + " update unsuccessful");
        }
    },

    //Delete a user by email
    deleteUserByEmail: async (req, res) => {
        try {
            const user = await User.findOneAndDelete(req.params.email);
            if (!user) {
                logger.error("User " + req.params.email + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted' });
            logger.info("User " + req.params.email + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("User " + req.params.email + " deleted successfully");
        }
    }
};

export default UserController;
