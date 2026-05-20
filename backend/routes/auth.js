const router = require("express").Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// REGISTER ROUTE
router.post("/register", async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            confirmPassword,
            emojiPattern
        } = req.body;


        // Check passwords match
        if (password !== confirmPassword) {

            return res.status(400).json({
                message: "Passwords do not match"
            });

        }


        // Password length validation
        if (password.length < 8) {

            return res.status(400).json({
                message:
                "Password must be at least 8 characters"
            });

        }


        // Check if email exists
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message:
                "Email already exists"
            });

        }


        // Generate Salt
        const salt =
            await bcrypt.genSalt(10);


        // Hash Password
        const hashedPassword =
            await bcrypt.hash(password, salt);


        // Convert emoji array into string
        const patternString =
            emojiPattern.join("-");


        // Hash emoji pattern
        const hashedPattern =
            await bcrypt.hash(
                patternString,
                salt
            );


        // Create new user
        const newUser = new User({

            username,
            email,
            password: hashedPassword,
            emojiPattern: hashedPattern

        });


        // Save user
        await newUser.save();


        res.status(201).json({
            message:
            "User registered successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});



// LOGIN ROUTE
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password,
            emojiPattern
        } = req.body;


        // Find user
        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        // Compare password
        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                message:
                "Invalid password"
            });

        }


        // Convert emoji array to string
        const patternString =
            emojiPattern.join("-");


        // Compare emoji pattern
        const validPattern =
            await bcrypt.compare(
                patternString,
                user.emojiPattern
            );

        if (!validPattern) {

            return res.status(400).json({
                message:
                "Incorrect emotion pattern"
            });

        }


        // Generate JWT token
        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: "1h" }

        );


        res.json({

            message:
            "Login successful",

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