import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Movie from "./models/structure.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/MovieTracker";

// Improved MongoDB connection with better error handling
mongoose.connect(MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// GET all movies
app.get("/get", async (req, res) => {
  try {
    const data = await Movie.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// DELETE a movie
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format" });
  }
  
  try {
    const content = await Movie.findByIdAndDelete(id);
    if (!content) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully", data: content });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
});

// ADD a new movie
app.post("/add", async (req, res) => {
  const data = req.body;
  
  // Basic validation
  if (!data.title || !data.genre || !data.rating || !data.director || !data.cast || !data.releaseDate || !data.likes || !data.description || !data.image) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  try {
    const newMovie = new Movie(data);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: "Failed to add movie" });
  }
});

// UPDATE a movie
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format" });
  }
  
  // Check if at least one field is provided for update
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "No update data provided" });
  }
  
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: "Failed to update movie" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running successfully on port ${port}`);
});
