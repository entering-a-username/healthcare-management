const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;

const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

module.exports.getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.showBy) || 5;
    const available = parseInt(req.query.available) || undefined;
    
    if (available) {
        const doctors = await Doctor.find({available: true}).select("-password").skip((page - 1) * perPage).limit(perPage).exec();
        const totalDoctors = await Doctor.find({available: true}).countDocuments();
        const totalPages = Math.ceil(totalDoctors / perPage) || 1;

        return res.json({'data': doctors, 'totalPages': totalPages, 'page': page});
    }

    const totalDoctors = await Doctor.find().countDocuments();

    const totalPages = Math.ceil(totalDoctors / perPage) || 1;
    const doctors = await Doctor.find().skip((page - 1) * perPage).limit(perPage).exec();
    res.send({"data": doctors, 'totalPages': totalPages, 'page': page});
}

module.exports.getOne = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select("-password");

        if (!doctor) {
            return res.status(500).json({})
        }
        res.send(doctor);
    } catch (err) {
        console.error(err);
    }
}

module.exports.addDoctor = async (req, res) => {
    try {
        const {name, email, speciality, degree, experience, about, fee } = req.body;

        const imageFile = req.files;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("fifififi", salt);

        const imgUpload = await cloudinary.uploader.upload(imageFile[0].path, {
            resource_type: "image",
        });
        const imgURL = imgUpload.secure_url;

        const doctor = {
            name, email, icon: imgURL, password: hashedPassword, speciality, degree, experience, about, fee
        }

        const newDoctor = new Doctor(doctor);

        await newDoctor.save();

        res.json({ success: true });

    } catch (err) {
        console.error(err);
    }
}

module.exports.deleteDoctor = async (req, res) => {
    try {
        const del = await Doctor.findByIdAndDelete(req.params.id);

        if (!del) {
            res.status(404).json();
        }

        res.status(200).json({success: true});
    } catch (err) {
        console.error(err);
    }
}

module.exports.editDoctor = async (req, res) => {
    try {
        const imageFile = req.files;

        const imgUpload = await cloudinary.uploader.upload(imageFile[0].path, {
            resource_type: "image",
        });
        const imgURL = imgUpload.secure_url;

        const updateObj = {
            name: req.body.name,
            email: req.body.email,
            icon: imgURL,
            speciality: req.body.speciality,
            experience: req.body.experience,
            about: req.body.about,
            fee: req.body.fee,
            days: req.body.days,
        }

        const filteredObj = Object.fromEntries(
            Object.entries(updateObj).filter(([_, value]) => value !== undefined && value !== "")
        )

        const currentDoctor = await Doctor.findById(req.params.id);
    
        const changedFields = {};
        for (const [key, value] of Object.entries(filteredObj)) {
            if (currentDoctor[key] !== value) {
                changedFields[key] = value;
            }
        }
    
        if (Object.keys(changedFields).length > 0) {
            await Doctor.findByIdAndUpdate(
                req.params.id,
                { $set: changedFields },
                { new: true }
            );
    
            res.status(200).json({success: true});
        } else {
            res.json({ message: "no changes" });
        }
    } catch (err) { 
        console.error(err);
    }
}

module.exports.bookAppointment = async (req, res) => {
    const doctor = await Doctor.findById(req.body.docId);

    const appointment = new Appointment({
        userId: req.body.userId,
        docId: req.body.docId,
        docInfo: {
            icon: doctor.icon,
            name: doctor.name,
            speciality: doctor.speciality,
            rating: 4,
            fee: doctor.fee,
        },
        slotTime: req.body.hour,
        slotDate: {
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
            date: req.body.date,
        },
    });

    const user = await User.findById(req.body.userId);
    user.appointments.push(appointment);
    await user.save();
    
    doctor.appointments.push(appointment);
    await doctor.save();

    const newAppointment = new Appointment(appointment);

    await newAppointment.save();

    res.json({success: true});
}