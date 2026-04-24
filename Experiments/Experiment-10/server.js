const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.log("❌ Database Connection Error:", err));

// Import Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Experiment-10: CRUD Operations API is running...");
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
  console.log("Access API at: http://localhost:5000");
});