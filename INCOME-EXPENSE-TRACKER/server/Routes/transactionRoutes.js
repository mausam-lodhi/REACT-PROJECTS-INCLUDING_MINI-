import express from "express";
import transaction from "../models/TransactionModel.js";
import category from "../models/CategoryModel.js";

const router = express.Router();

// Add a new transaction
router.post("/transactions/add", async (req, res) => {
	const { amount, type, category, date, remark, paymentMode } = req.body;
	
	if (!amount || !type || !category || !date || !remark || !paymentMode) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const newTransaction = new transaction({ amount, type, category, date, remark, paymentMode });
	try {
		await newTransaction.save();
		res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
	} catch (error) {
		console.error("Error adding transaction:", error);
		res.status(500).json({ error: "Error adding transaction" });
	}
});

// Get all transactions
router.get("/transactions", async (req, res) => {
	try {
		const displayTransaction = await transaction.find().populate('category');
		res.status(200).json(displayTransaction);
	} catch (error) {
		console.error("No data found : ", error);
		res.status(500).json({ error: "Error fetching transactions" });
	}
});

// Get transaction by ID
router.get("/transactions/edit/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const displayTransactionByID = await transaction.findById(id).populate('category');
		if (!displayTransactionByID) {
			return res.status(404).json({ error: "Transaction not found" });
		}
		res.status(200).json(displayTransactionByID);
	} catch (error) {
		console.error("No data found by id: ", error);
		res.status(500).json({ error: "Error fetching transaction" });
	}
});

// Update transaction by ID
router.put("/transactions/edit/:id", async (req, res) => {
	const id = req.params.id;
	const { amount, type, category, date, remark, paymentMode } = req.body;
	
	if (!amount || !type || !category || !date || !remark || !paymentMode) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const updatedTransaction = await transaction.findByIdAndUpdate(id, { amount, type, category, date, remark, paymentMode }, { new: true }).populate('category');
		if (!updatedTransaction) {
			return res.status(404).json({ error: "Transaction not found" });
		}
		res.status(200).json(updatedTransaction);
	} catch (error) {
		console.error("Transaction is not updated : ", error);
		res.status(500).json({ error: "Error updating transaction" });
	}
});

// Get all category types
router.get("/categories/types", async (req, res) => {
	try {
		const types = await category.distinct("type");
		res.send(types);
	} catch (error) {
		console.error("Error fetching transaction types: ", error);
		res.status(500).json({ error: "Error fetching transaction types" });
	}
});

// Get categories by type
router.get("/categories/:type", async (req, res) => {
	const type = req.params.type;
	try {
		const categories = await category.find({ type });
		res.send(categories);
	} catch (error) {
		console.error("Error fetching categories: ", error);
		res.status(500).json({ error: "Error fetching categories" });
	}
});

// Get all categories
router.get("/categories", async (req, res) => {
	try {
		const categories = await category.find();
		res.send(categories);
	} catch (error) {
		console.error("Error fetching categories: ", error);
		res.status(500).json({ error: "Error fetching categories" });
	}
});

// Delete transaction by ID
router.delete("/transactions/delete/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deletedTransaction = await transaction.findByIdAndDelete(id);
		if (!deletedTransaction) {
			return res.status(404).json({ error: "Transaction not found" });
		}
		res.status(200).json({ message: "Transaction deleted successfully" });
	} catch (error) {
		console.error("Transaction is not deleted : ", error);
		res.status(500).json({ error: "Error deleting transaction" });
	}
});

export default router;
