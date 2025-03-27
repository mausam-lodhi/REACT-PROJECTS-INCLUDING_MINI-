import mongoose from "mongoose";
const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ["Income", "Expense"],
		required: true,
	},
});
const Category = mongoose.model("Category", schema);
export default Category;
