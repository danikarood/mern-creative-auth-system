const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            confirmPassword,
            emojiPattern
        } = req.body;

        if (!username || !email || !password || !confirmPassword || !emojiPattern) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const patternString = emojiPattern.join("-");
        const hashedPattern = await bcrypt.hash(patternString, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            emojiPattern: hashedPattern
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password,
            emojiPattern
        } = req.body;

        if (!email || !password || !emojiPattern) {
            return res.status(400).json({
                message: "Email, password, and emoji pattern are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const patternString = emojiPattern.join("-");
        const validPattern = await bcrypt.compare(patternString, user.emojiPattern);

        if (!validPattern) {
            return res.status(400).json({
                message: "Incorrect emotion pattern"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "your_fallback_secret",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                username: user.username
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;