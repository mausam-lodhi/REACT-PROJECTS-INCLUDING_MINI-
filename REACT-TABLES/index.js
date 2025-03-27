import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import table from "./models/table.js";
const app = express();

app.use(express.json());
app.use(cors());
const port = 8080;

async function main() {
	try {
		await mongoose.connect("mongodb://localhost:27017/CD-REACT", { useNewUrlParser: true, useUnifiedTopology: true });
		console.log("MongoDB Connected");
	} catch (err) {
		console.log(err);
	}
}

main();

app.get("/", async (req, res) => {
	await res.send("hello world");
});

app.get("/get", async (req, res) => {
	try {
		const content = await table.find();
		res.json(content);
	} catch (err) {
		console.log(err);
	}
});
app.get("/get/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const content = await table.findById(id);
		if (!content) {
			return res.status(404).json({ error: "Document not found" });
		}
		res.json(content);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.post("/get", async (req, res) => {
	const { name, city, salary, isGood } = req.body;

	if (!name || !city || !salary || isGood === undefined) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const newTable = new table({ name, city, salary, isGood });
	try {
		await newTable.save();
		res.json(newTable);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
});


app.put("/get/:id", async (req, res) => {
	const { id } = req.params;
	const { name, city, salary, isGood } = req.body;

	if (!name || !city || !salary || isGood === undefined) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const updatedTable = await table.findByIdAndUpdate(id, { name, city, salary, isGood }, { new: true });
		if (!updatedTable) {
			return res.status(404).json({ error: "Document not found" });
		}
		res.json(updatedTable);
		
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.delete("/get/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const content = await table.findByIdAndDelete(id);
		if (!content) {
			return res.status(404).json({ error: "Document not found" });
		}
		res.json(content);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(port, () => {
	console.log(`server is running on ${port}`);
});
