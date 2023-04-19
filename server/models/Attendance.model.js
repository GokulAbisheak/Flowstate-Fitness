import mongoose from "mongoose";


const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

    name: { type: String, required: true },
    date: { type: Date, required: true },
    present: { type: boolean},
    absent: { type: boolean},

});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;

module.exports = router;