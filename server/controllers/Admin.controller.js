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

    //Get admin by id
    getAdminById: async (req, res) => {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) {
                logger.error("Admin" + req.params.id + " not found");
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting admin " + req.params.id);
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

    //Update a admin by id
    updateAdminById: async (req, res) => {
        try {
            const admin = await Admin.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            logger.info("Admin" + req.params.id + " update successful");
            if (!admin) {
                logger.error("Admin" + req.params.id + " not found");
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Admin" + req.params.id + " update unsuccessful");
        }
    },

    //Delete a admin by id
    deleteAdminById: async (req, res) => {
        try {
            const admin = await Admin.findByIdAndDelete(req.params.id);
            if (!admin) {
                logger.error("Admin" + req.params.id + " not found");
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.status(200).json({ message: 'Admin deleted' });
            logger.info("Admin" + req.params.id + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("Admin" + req.params.id + " deleted successfully");
        }
    }
};

export default AdminController;
