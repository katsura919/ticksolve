const express = require("express");
const router = express.Router();
const { createComplaint, getAllComplaints } = require("../controllers/complaintController");

// Route to submit a complaint
router.post("/complaints", createComplaint);

// Route to fetch all complaints (optional)
router.get("/complaints", getAllComplaints);

module.exports = router;
