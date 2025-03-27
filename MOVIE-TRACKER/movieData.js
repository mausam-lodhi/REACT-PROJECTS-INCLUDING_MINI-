import mongoose from "mongoose";
import Movie from "./models/structure.js";
import rawDataOfMovies from "./rawDataOfMovies.js";

const MONGO_URL = "mongodb://localhost:27017/MovieTracker";

async function main() {
	try {
		await mongoose.connect(MONGO_URL);
		try {
			await Movie.insertMany(rawDataOfMovies);
			console.log("Data inserted successfully");
		} catch (error) {
			console.log("Error in creating the database : ", error);
		}
	} catch (err) {
		console.error("Database is not connected dear : ", err);
	}
}

main().then(() => {
	console.log("Database is successfully connected dear");
});
