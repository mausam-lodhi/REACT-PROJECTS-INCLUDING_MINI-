import express from "express";
import category from "../models/CategoryModel.js";
const router = express.Router();

// Get all categories
router.get("/category", async (req, res) => {
	try {
		const displayCategory = await category.find();
		res.status(200).json(displayCategory);
	} catch (error) {
		console.error("No data found : ", error);
		res.status(500).json({ error: "Error fetching categories" });
	}
});

// Get a category by ID
router.get("/category/edit-category/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const displayCategoryByID = await category.findById(id);
		if (!displayCategoryByID) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.status(200).json(displayCategoryByID);
	} catch (error) {
		console.error("No data found by id: ", error);
		res.status(500).json({ error: "Error fetching category" });
	}
});

// Add a new category
router.post("/category/add-category", async (req, res) => {
	const { name, type } = req.body;
	if (!name || !type) {
		return res.status(400).json({ error: "Name and type are required" });
	}
	const newCategory = new category({ name, type });

	try {
		await newCategory.save();
		res.status(201).send(newCategory);
	} catch (error) {
		console.error("Error adding category:", error);
		res.status(500).send({ message: "Error adding category", error });
	}
});

// Edit a category by ID
router.put("/category/edit-category/:id", async (req, res) => {
	const id = req.params.id;
	const { name, type } = req.body;
	try {
		const updatedCategory = await category.findByIdAndUpdate(id, { name, type }, { new: true });

		if (!updatedCategory) {
			return res.status(404).send({ message: "Category not found" });
		}

		res.send(updatedCategory);
	} catch (error) {
		console.error("Category is not updated:", error);
		res.status(500).send({ message: "Error updating category", error });
	}
});

// Delete a category by ID
router.delete("/category/delete/:id", async (req, res) => {
	// Delete a category by ID
	const _id = req.params.id;
	try {
		const deletedCategory = await category.findByIdAndDelete(_id);
		if (!deletedCategory) {
			return res.status(404).send({ message: "Category not found" });
		}
		res.send({ message: "Category deleted successfully" });
	} catch (error) {
		console.error("Category is not deleted:", error);
		res.status(500).send({ message: "Error deleting category", error });
	}
});

export default router;
