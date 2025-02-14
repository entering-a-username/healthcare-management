const { Router } = require("express");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = Router();

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    let token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge,
    });
    return token;
}

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            errors.email = "this email is taken.";
            res.status(200).json({error: "this email is taken"});
        }

        await User.create({ username, email, password});

        res.status(200).json({ status: 'success' })
    } catch (err) {
        console.error(err);
    }
})

router.post("/login", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({ status: "success", userId: user._id });
    } catch (err) {
        console.log(err);
    }
})

router.get("/logout", async (req, res) => {
    res.cookie('jwt', ' ', { maxAge: 1 });
    res.json({status: "success"});
})

module.exports = router;