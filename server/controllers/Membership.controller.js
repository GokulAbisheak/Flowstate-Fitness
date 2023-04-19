import Membership from '../models/Membership.model.js';
import logger from '../utilities/logger.js';

const MembershipController = {

    //Get all memberships
    getAllMemberships: async (req, res) => {
        try {
            const memberships = await Membership.find();
            res.status(200).json(memberships);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all memberships");
        }
    },

    //Get membership by id
    getMembershipById: async (req, res) => {
        try {
            const membership = await Membership.findById(req.params.id);
            if (!membership) {
                logger.error("Membership " + req.params.id + " not found");
                return res.status(404).json({ message: 'Membership not found' });
            }
            res.status(200).json(membership);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting membership " + req.params.id);
        }
    },

    //Get membership by email
    getMembershipByEmail: async (req, res) => {
        try {
            const membership = await Membership.findOne({ email: req.params.email });
            if (!membership) {
                logger.error("Membership " + req.params.email + " not found");
                return res.status(404).json({ message: 'Membership not found' });
            }
            res.status(200).json(membership);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting membership " + req.params.email);
        }
    },

    //Create a new membership
    createMembership: async (req, res) => {
        try {
            const membership = new Membership(req.body);
            await membership.save();
            res.status(201).json(membership);
            logger.info("Membership create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Membership create failed");
        }
    },

    //Update a membership by id
    updateMembershipById: async (req, res) => {
        try {
            const membership = await Membership.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            logger.info("Membership " + req.params.id + " update successful");
            if (!membership) {
                logger.error("Membership " + req.params.id + " not found");
                return res.status(404).json({ message: 'Membership not found' });
            }
            res.status(200).json(membership);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Membership " + req.params.id + " update unsuccessful");
        }
    },

    //Delete a membership by id
    deleteMembershipById: async (req, res) => {
        try {
            const membership = await Membership.findByIdAndDelete(req.params.id);
            if (!membership) {
                logger.error("Membership " + req.params.id + " not found");
                return res.status(404).json({ message: 'Membership not found' });
            }
            res.status(200).json({ message: 'Membership deleted' });
            logger.info("Membership " + req.params.id + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("Membership " + req.params.id + " deleted successfully");
        }
    }
};

export default MembershipController;
