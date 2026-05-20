const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("../routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Connect our authorization routing
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

// Connect to MongoDB Atlas Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ DB Connection Error: ", err));

app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});