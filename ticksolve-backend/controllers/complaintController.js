const Complaint = require("../models/Complaint");

// ✅ Create a new complaint
exports.createComplaint = async (req, res) => {
    try {
        const { studentId, complaintType } = req.body;
        console.log(studentId, complaintType);
        // Ensure both fields are provided
        if (!studentId || !complaintType) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newComplaint = new Complaint({ studentId, complaintType });
        await newComplaint.save();

        res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get all complaints (Optional for admin)
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
