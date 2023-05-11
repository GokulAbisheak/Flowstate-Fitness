// const express = require('express');
// const router = express.Router();
// const Attendance = require('../models/Attendance');

import Attendance from '../models/Attendance.model.js'
import logger from '../utilities/logger.js';

const AttendanceController = {

    //Get all attendance
    getAttendance: async (req, res) => {
        try {
            const Allattendance = await Attendance.find();
            res.status(200).json(Allattendance);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting attendance of all");
        }
    },

    updateAttendanceByName: async (req, res) => {
        try {
            const attendance = await Attendance.findOneAndUpdate(
                {name : req.params.name},
                req.body,
                { new: true }
            );
            logger.info("Attendance " + req.params.name + " update successful");
            if (!attendance) {
                logger.error("Attendance " + req.params.name + " not found");
                return res.status(404).json({ message: 'Name not found' });
            }
            res.status(200).json(attendance);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Attendace " + req.params.name + " update unsuccessful");
        }
    },

    updateAttendance: async (req, res) => {
        try {
            const attendance = await Attendance.findOneAndUpdate(
                
                {$and: [
                    {name: req.query.name},
                    {date: req.query.date}
                ]},
                req.body,
                { new: true }
            );
            logger.info("Attendance " + req.query.name + " update successful");
            if (!attendance) {
                logger.error("Attendance " + req.query.name + " not found");
                return res.status(404).json({ message: 'Name not found' });
            }
            res.status(200).json(attendance);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Attendace " + req.query.name + " update unsuccessful");
        }
    },

    //Get products by id
    getAttendanceById: async (req, res) => {
        try {
            const attendance = await Attendance.findOne({name : req.params.name});
            if (!attendance) {
                logger.error("Attendance " + req.params.name + " not found");
                return res.status(404).json({ message: 'Name not found' });
            }
            res.status(200).json(attendance);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting attendance " + req.params.name);
        }
    },

    //Create Attendance
  //Create Attendance
  createAttendance: async (req, res) => {
    try {
        logger.info(req.body)
        const { name, date, present, absent } = req.body;

        const attendance = new Attendance({

            name,
            date,
            present,
            absent,

        });
        await attendance.save();
        res.status(201).json(attendance);
        logger.info("Attendance create successful");
    } catch (error) {
        res.status(400).json({ message: error.message });
        logger.error("Attendance create failed");
    }
},

//Delete a product by id
deleteAttendanceByName: async (req, res) => {
    try {
        const attendance = await Attendance.findOneAndDelete({name: req.params.name});
        if (!attendance) {
            logger.error("Attendance " + req.params.name + " not found");
            return res.status(404).json({ message: 'Attendance not found' });
        }
        res.status(200).json({ message: 'Attendance deleted' });
        logger.info("Attendance " + req.params.name + " deleted successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
        logger.info("Attendance " + req.params.name + " deleted successfully");
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

