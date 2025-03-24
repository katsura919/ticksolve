const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, studentId, password } = req.body;

        // Check if student ID already exists
        const existingUser = await User.findOne({ studentId });
        if (existingUser) return res.status(400).json({ message: "Student ID already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({ name, studentId, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { studentId, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ studentId });
        if (!user) return res.status(400).json({ message: "Invalid student ID or password" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid student ID or password" });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, studentId: user.studentId, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
