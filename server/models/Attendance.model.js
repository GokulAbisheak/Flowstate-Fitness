import mongoose from "mongoose";


const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

    name: { type: String, required: true },
    date: { type: Date, required: true },
    present: { type: Boolean, default: false },
    absent: { type: Boolean, default: false }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;