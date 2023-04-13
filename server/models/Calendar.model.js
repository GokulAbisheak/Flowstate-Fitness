import mongoose from "mongoose";

const Schema = mongoose.Schema;

const calendarSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: TimeRanges,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    addedBy: {
        type: String,
        required: true
    }

});

const Calendar = mongoose.model('Calendar', calendarSchema);

export default Calendar;