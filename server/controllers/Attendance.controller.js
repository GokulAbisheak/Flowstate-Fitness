// const express = require('express');
// const router = express.Router();
// const Attendance = require('../models/Attendance');

import Attendance from '../models/Attendance.model.js'
import logger from '../utilities/logger.js';

const AttendanceController = {

    //Get all products
    getAttendance: async (req, res) => {
        try {
            const Allattendance = await Attendance.find();
            res.status(200).json(Allattendance);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting attendance of all");
        }
    },

    //Get products by id
    getAttendanceById: async (req, res) => {
        try {
            const attendance = await Attendance.findOne({name : req.params.name});
            if (!attendance) {
                logger.error("Product " + req.params.name + " not found");
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(attendance);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting attendance " + req.params.name);
        }
    },

    //Create Attendance
    createAttendance: async (req, res) => {
        try {
            const product = new Attendance(req.body);
            await product.save();
            res.status(201).json(attendance);
            logger.info("Product create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Product create failed");
        }
    }
    // // Add attendance record
    // getAttendance: async (req, res) => {
    //     try {
    //         const { name, date, present, absent } = req.body;

    //         const attendance = new Attendance({
    //             name,
    //             date,
    //             present,
    //             absent,
    //         });

    //         await attendance.save();
    //         res.status(201).json({ message: 'Attendance added successfully.' });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Internal server error.' });
    //     }
    // }

};

export default AttendanceController;

module.exports = router;