const { Router } = require("express");

const doctorControllers = require("../controllers/doctorControllers");
const userControllers = require("../controllers/userControllers");

const upload = require("../middleware/multer");

const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

const router = Router();

// doctor
router.get("/doctor", doctorControllers.getAll);
router.get("/doctor/:id", doctorControllers.getOne);
router.put("/doctor/:id", upload.array("files"), doctorControllers.editDoctor);
router.post("/doctor/:id", doctorControllers.bookAppointment);
router.delete("/doctor/:id", doctorControllers.deleteDoctor);
router.post("/doctor/create", upload.array("files"), doctorControllers.addDoctor);

// user
router.get("/user", userControllers.getAll);
router.get("/user/:id", userControllers.getOne);
router.delete("/doctor/:id", userControllers.deleteUser);
router.put("/user/:id", upload.array("files"), userControllers.editUser);

// appointment
router.delete("/appointment/:id", async (req, res) => {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);

    const user = await User.findById(appointment.userId).select("-password");
    const doctor = await Doctor.findById(appointment.docId).select("-password");
    
    user.appointments = user.appointments.filter(app => app._id.toString() !== id);
    doctor.appointments = doctor.appointments.filter(app => app._id.toString() !== id);
    
    await user.save();
    await doctor.save();

    await Appointment.findByIdAndDelete(id);
})

module.exports = router;