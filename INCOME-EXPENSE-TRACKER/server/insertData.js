import mongoose from "mongoose";
import CategoryModel from "./models/CategoryModel.js";
import TransactionModel from "./models/TransactionModel.js";
const MONGO_URL = "mongodb://localhost:27017/IETRACKER";
const categoryData = [
	{
		name: "foods",
		type: "Expense",
	},
	{
		name: "fees",
		type: "Expense",
	},
	{
		name: "clothes",
		type: "Expense",
	},
];
const transactionData = [
	{
		amount: 1000,
		type: "Expense",
		category: "67567d36a560c911c8cbfe07",
		date: new Date(),
		remark: "foods are very delicious",
		paymentMode: "offline",
	},
	{
		amount: 1000,
		type: "Expense",
		category: "67567d36a560c911c8cbfe08",
		date: new Date(),
		remark: "fees is too much high",
		paymentMode: "online",
	},
	{
		amount: 1000,
		type: "Expense",
		category: "67567d36a560c911c8cbfe09",
		date: new Date(),
		remark: "clothes sre too much high",
		paymentMode: "online",
	},
];
async function main() {
	try {
		await mongoose.connect(MONGO_URL);
	} catch (err) {
		console.error("Mongodb is not connected dear ; ", err);
	}
}
main().then(async () => {
	try {
		await CategoryModel.insertMany(categoryData);
		console.log(" Category Data has been inserted successfully dear");
	} catch (err) {
		console.error(" Category Data is not inserted dear ", err);
	}
	try {
		await TransactionModel.insertMany(transactionData);
		console.log(" Transaction Data has been inserted successfully dear");
	} catch (error) {
		console.error(" Transaction Data is not inserted dear ", error);
	}
});
