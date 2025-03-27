import mongoose from "mongoose";

const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	salary: {
		type: Number,
		required: true,
	},
	isGood: {
		type: String,
		required: true,
	},
});
const Table = mongoose.model("table", schema);

export default Table;
