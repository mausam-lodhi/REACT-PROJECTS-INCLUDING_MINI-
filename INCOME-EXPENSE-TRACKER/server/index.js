import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./Routes/categoryRoutes.js";
import transactionRoutes from "./Routes/transactionRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(categoryRoutes);
app.use(transactionRoutes);

const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/IncomeExpenseTracker";

async function connectDB() {
	try {
		await mongoose.connect(MONGO_URL, {
			serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
		});
		console.log(`MongoDB Connected: ${mongoose.connection.host}`);
	} catch (err) {
		console.error("Database connection error: ", err);
		process.exit(1);
	}
}

// MongoDB event listeners
mongoose.connection.on("disconnected", () => {
	console.log("MongoDB disconnected! Attempting to reconnect...");
	// Attempt to reconnect
	setTimeout(() => {
		connectDB();
	}, 5000);
});

mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err.message);
});

mongoose.connection.on("connected", () => {
	console.log("Successfully connected to MongoDB");
});

// Connect to database and start server
connectDB().then(() => {
	app.listen(port, () => {
		console.log(`Server is running successfully on port ${port}`);
	});
});

// Root route
app.get("/", (req, res) => {
	res.send("you are in the root directory from index");
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
