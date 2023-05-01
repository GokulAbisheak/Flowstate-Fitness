import Admin from '../models/Admin.model.js';
import logger from '../utilities/logger.js';

const AdminController = {

    //Get all admins
    getAllAdmins: async (req, res) => {
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all admins");
        }
    },

    //Get admin by email
    getAdminByEmail: async (req, res) => {
        try {
            const admin = await Admin.findOne({ email: req.params.email });
            if (!admin) {
                logger.error("Admin " + req.params.email + " not found");
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting admin " + req.params.email);
        }
    },

    //Create a new admin
    createAdmin: async (req, res) => {
        try {
            const admin = new Admin(req.body);
            await admin.save();
            res.status(201).json(admin);
            logger.info("Admin create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Admin create failed");
        }
    },

    //Update an admin by email
    updateAdminByEmail: async (req, res) => {
        try {
            const admin = await Admin.findOneAndUpdate(
                { email: req.params.email },
                req.body,
                { new: true }
            );
            logger.info("Admin " + req.params.email + " update successful");
            if (!admin) {
                logger.error("Admin " + req.params.email + " not found");
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Admin " + req.params.email + " update unsuccessful");
        }
    },

    //Delete an admin by email
    deleteAdminByEmail: async (req, res) => {
        try {
            const admin = await Admin.findOneAndDelete(req.params.email);
            if (!admin) {
                logger.error("Admin " + req.params.email + " not found");
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json({ message: 'Admin deleted' });
            logger.info("Admin " + req.params.email + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("Admin " + req.params.email + " deleted successfully");
        }
    }
};

export default AdminController;
