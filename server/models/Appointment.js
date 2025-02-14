const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    docId: {
        type: String,
        required: true,
    },
    slotDate: {
        type: Object, required: true,
    },
    docInfo: {
        type: Object,
    },
    slotTime: {
        type: String, required: true,
    },
    cancelled: {
        type: Boolean, default: false
    },
    payment: {
        type: Boolean, default: false,
    },
    isCompleted: {
        type: Boolean, default: false,
    }
}, {timestamps: true});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;