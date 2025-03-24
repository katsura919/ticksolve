const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    complaintType: {
        type: String,
        required: true,
        enum: ["academic", "it", "administrative", "harassment", "security", "others"]
    },
    status: {
        type: String,
        default: "pending" // Default status when submitted
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
