const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const db = require("./config/database");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const cityRoutes = require("./routes/cityRoutes");
const criteriaRoutes = require("./routes/criteriaRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const prometheeRoutes = require("./routes/prometheeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Gunakan Routes
app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/criteria", criteriaRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/promethee", prometheeRoutes);

app.get("/", (req, res) => {
	res.send("Server Backend SPK Island Berjalan!");
});

app.listen(PORT, () => {
	console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
