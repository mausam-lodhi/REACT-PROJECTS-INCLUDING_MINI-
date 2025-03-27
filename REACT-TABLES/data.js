import mongoose from "mongoose";
import table from "./models/table.js";
const dataform = [
	{
		name: "John",
		city: "New York",
		salary: 1000,
		isGood: "Yes",
	},
	{ name: "Doe", city: "Los Angeles", salary: 2000, isGood: "No" },
];
async function main() {
	mongoose.set("useNewUrlParser", true);
	const mongoConnectionString = "mongodb://localhost:27017/CD-REACT";
	await mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	try {
		await table.insertMany(dataform);
		console.log("Data inserted successfully");
	} catch (err) {
		console.error("Error inserting data:", err);
	}
}
main()
	.then(() => {
		console.log("MongoDB Connected");
	})
	.catch((err) => {
		console.log(err);
	});
