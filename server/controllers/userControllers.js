const User = require('../models/User');

module.exports.getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.showBy) || 5;

    const totalUsers = await User.find().countDocuments();

    const totalPages = Math.ceil(totalUsers / perPage) || 1;
    const users = await User.find().select("-password").skip((page - 1) * perPage).limit(perPage).exec();
    res.send({"data": users, 'totalPages': totalPages, 'page': page});
}

module.exports.getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(500).json({})
        }
        res.send(user);
    } catch (err) {
        console.error(err);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const del = await User.findByIdAndDelete(req.params.id);

        if (!del) {
            res.status(404).json();
        }

        res.status(200).json({success: true});
    } catch (err) {
        console.error(err);
    }
}

module.exports.editUser = async (req, res) => {
    try {
        const updateObj = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
        }

        const filteredObj = Object.fromEntries(
            Object.entries(updateObj).filter(([_, value]) => value !== undefined && value !== "")
        )

        const currentUser = await User.findById(req.params.id);

        const changedFields = {};
        for (const [key, value] of Object.entries(filteredObj)) {
            if (currentUser[key] !== value) {
                changedFields[key] = value;
            }
        }
    
        if (Object.keys(changedFields).length > 0) {
            await User.findByIdAndUpdate(
                req.params.id,
                { $set: changedFields },
                { new: true }
            );
    
            res.status(200).json({status: "success"});
        } else {
            res.json({ message: "no changes" });
        }
    } catch (err) { 
        console.error(err);
    }
}