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

    //Get user by id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                logger.error("User" + req.params.id + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting user " + req.params.id);
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

    //Update a user by id
    updateUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            logger.info("User" + req.params.id + " update successful");
            if (!user) {
                logger.error("User" + req.params.id + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("User" + req.params.id + " update unsuccessful");
        }
    },

    //Delete a user by id
    deleteUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                logger.error("User" + req.params.id + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted' });
            logger.info("User" + req.params.id + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("User" + req.params.id + " deleted successfully");
        }
    }
};

export default UserController;
