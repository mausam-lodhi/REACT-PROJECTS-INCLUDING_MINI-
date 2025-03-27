import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		if (error.code === "ECONNREFUSED") {
			console.error("MongoDB connection refused. Please check if:");
			console.error("1. MongoDB is running on your system");
			console.error("2. Your MONGO_URL is correct");
			console.error(`3. MongoDB is listening on the correct port`);
		} else {
			console.error(`Error: ${error.message}`);
		}
		process.exit(1);
	}
};

mongoose.connection.on("disconnected", () => {
	console.log("MongoDB disconnected! Attempting to reconnect...");
	// Attempt to reconnect
	setTimeout(() => {
		connectDB();
	}, 5000);
});

mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err.message);
	// Log additional error details if available
	if (err.stack) {
		console.error("Stack trace:", err.stack);
	}
});

mongoose.connection.on("connected", () => {
	console.log("Successfully connected to MongoDB");
});

export default connectDB;
