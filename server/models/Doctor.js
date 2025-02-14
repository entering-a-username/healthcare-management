const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    days: [{
        type: String,
    }],
    slotsBooked: {
        type: Object,
        default: {}
    },
    appointments: [
        {
            type: Object,
        }
    ]
}, {timestamps: true, minimize: false});

const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;