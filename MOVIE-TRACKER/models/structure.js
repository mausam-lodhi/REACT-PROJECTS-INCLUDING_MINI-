import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
	image: {
		type: String,
		set: (v) => (v === "" ? "https://via.placeholder.com/150" : v),
	},
	title: {
		type: String,
		required: true,
	},
	genre: {
		type: [String],
		required: true,
	},
	releaseDate: {
		type: Date,
		required: true,
	},
	director: {
		type: String,
		required: true,
	},
	cast: {
		type: [String],
	},
	rating: {
		type: Number,
	},
	likes: {
		type: Number,
	},
	description: {
		type: String,
	},
});

const Movie = mongoose.model("movie", movieSchema);
export default Movie;
