import User from '../models/User.model.js';
import logger from '../utilities/logger.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Generate JWT
const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

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
            const user = await User.findOne({ email: req.params.email });
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

            logger.info(req.body)
            const { firstName, lastName, email, password, dateOfBirth, phoneNumber } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                dateOfBirth,
                phoneNumber,
                flowTokens: 0
            });
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
                { email: req.params.email },
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
    },

    //login

    loginUser: async (req, res) => {
        const {email, password} = req.body
        const user = await User.findOne({ email: email });
        
        if (user && (await bcrypt.compare(password, user.password))) {

            const userLogin = {
                user,
                token: generateToken(user._id)
            }

            res.status(200).json(userLogin)
        } else {
            res.status(400).json('invalid credenials');
        }
    },

    getMe: async (req, res) => {
        res.json('Working')
    }
};

export default UserController;
