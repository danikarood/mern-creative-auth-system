const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');   

// Register a new user
exports.register = async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            confirmPassword,
            emojiPattern
        } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {

            return res.status(400).json({
                message: "Passwords do not match"
            });

        }
 // Minimum password length
        if (password.length < 8) {

            return res.status(400).json({
                message:
                "Password must be at least 8 characters"
            });

        }

        // Check if user exists
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message:
                "Email already exists"
            });

        }

        // Generate salt
        const salt =
            await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, salt);

        // Convert emoji array to string
        const patternString =
            emojiPattern.join("-");

        // Hash emoji pattern
        const hashedPattern =
            await bcrypt.hash(
                patternString,
                salt
            );

        // Create user
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

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// LOGIN USER
exports.login = async (req, res) => {

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

            return res.status(400).json({
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
                "Invalid credentials"
            });

        }

        // Convert emoji pattern to string
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

            message: "Login successful",

            token,

            user: {
                username: user.username
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};