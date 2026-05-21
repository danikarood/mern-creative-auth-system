const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("dotenv").config();
console.log("🔑 MONGO_URI:", process.env.MONGO_URI); // add this

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Connect our authorization routing
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

// Connect to MongoDB Atlas Database
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ DB Connection Error: ", err.message));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});