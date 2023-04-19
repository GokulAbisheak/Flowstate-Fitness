import express from 'express';
import AttendanceController from '../controllers/Attendance.controller.js';

const AttendanceRouter = express.Router();

AttendanceRouter.get('/', AttendanceController.getAttendance);
AttendanceRouter.get('/:name', AttendanceController.getAttendanceById);
AttendanceRouter.post('/add', AttendanceController.createAttendance);

export default AttendanceRouter;