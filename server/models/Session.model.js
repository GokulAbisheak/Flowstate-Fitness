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
        type: String,
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

const Session = mongoose.model('Session', calendarSchema);

export default Session;