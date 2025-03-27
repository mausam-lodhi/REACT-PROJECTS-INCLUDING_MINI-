import mongoose from "mongoose";
const schema = new mongoose.Schema({
	amount: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		enum: ["Income", "Expense"],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category", // Ensure this matches the name of your category model
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	remark: {
		type: String,
		required: true,
	},
	paymentMode: {
		type: String,
		required: true,
	},
});
const Transaction = mongoose.model("Transaction", schema);
export default Transaction;
