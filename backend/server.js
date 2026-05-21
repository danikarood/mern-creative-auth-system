const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in environment variables.");
    process.exit(1);
}

dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("🔎 DNS servers set to:", dns.getServers());
console.log("🔑 MONGO_URI:", process.env.MONGO_URI);

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
    serverSelectionTimeoutMS: 3005,
})
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ DB Connection Error: ", err.message));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});