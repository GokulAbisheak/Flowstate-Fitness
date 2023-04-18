import mongoose from "mongoose";


const Schema = mongoose.Schema;

const calendarSchema = new Schema({

    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    description: { type: String },

});

const Session = mongoose.model('Session', calendarSchema);

export default Session;

module.exports = router;

