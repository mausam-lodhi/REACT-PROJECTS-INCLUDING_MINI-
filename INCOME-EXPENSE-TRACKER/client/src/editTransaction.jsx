import { useState, useEffect } from "react";
import { FaCalendarAlt, FaMoneyBillWave, FaClipboardList, FaCreditCard, FaCommentAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTransaction = () => {
	const { _id } = useParams();
	const [transactionData, setTransactionData] = useState({
		amount: "",
		type: "",
		category: "",
		date: "",
		remark: "",
		paymentMode: "",
	});
	const [transactionTypes, setTransactionTypes] = useState([]);
	const [transactionCategories, setTransactionCategories] = useState([]);
	const [data, setData] = useState({
		amount: "",
		type: "",
		category: "",
		date: "",
		remark: "",
		paymentMode: "",
	});

	const navigate = useNavigate();

	useEffect(() => {
		axios.get("http://localhost:8080/categories/types").then((response) => {
			setTransactionTypes(response.data);
		});
	}, []);

	useEffect(() => {
		if (data.type) {
			axios.get(`http://localhost:8080/categories/${data.type}`).then((response) => {
				setTransactionCategories(response.data);
			});
		}
	}, [data.type]);

	useEffect(() => {
		getTransactionData(_id);
	}, [_id]);

	function updateTransaction() {
		axios.put(`http://localhost:8080/transactions/edit/${_id}`, data)
			.then((response) => {
				console.log("Transaction updated successfully", response.data);
				navigate("/transaction");
			})
			.catch((error) => {
				console.error("Transaction is not updated", error);
			});
	}

	function getTransactionData(_id) {
		axios.get(`http://localhost:8080/transactions/edit/${_id}`)
			.then((response) => {
				const transactionData = response.data;
				// Format date to YYYY-MM-DD for input field
				const formattedDate = new Date(transactionData.date).toISOString().split('T')[0];
				setData({
					...transactionData,
					date: formattedDate
				});
			})
			.catch((error) => {
				console.error("Error fetching transaction data:", error);
			});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		updateTransaction();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center'>
			<form onSubmit={handleSubmit} className='w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 space-y-4 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl'>
				<h2 className='text-3xl font-bold text-gray-800 text-center mb-6 shadow-text'>Edit Transaction</h2>

				<div className='space-y-3'>
					<div className='relative group'>
						<label className='block text-gray-700 text-sm font-semibold mb-2 shadow-text'>
							<FaMoneyBillWave className='inline mr-2 text-green-500' />
							Amount
						</label>
						<input
							type='number'
							name='amount'
							value={data.amount}
							onChange={handleChange}
							placeholder='Enter amount here'
							className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all group-hover:border-blue-400'
							required
						/>
					</div>

					<div className='relative group'>
						<label className='block text-gray-700 text-sm font-semibold mb-2 shadow-text'>
							<FaClipboardList className='inline mr-2 text-purple-500' />
							Type
						</label>
						<select
							name='type'
							value={data.type}
							onChange={handleChange}
							className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all group-hover:border-blue-400'
							required>
							<option value=''>Select Type</option>
							{transactionTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					<div className='relative group'>
						<label className='block text-gray-700 text-sm font-semibold mb-2 shadow-text'>
							<FaClipboardList className='inline mr-2 text-blue-500' />
							Category
						</label>
						<select
							name='category'
							value={data.category}
							onChange={handleChange}
							className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all group-hover:border-blue-400'
							required>
							<option value=''>Select Category</option>
							{transactionCategories.map((cat) => (
								<option key={cat._id} value={cat._id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>

					<div className='relative group'>
						<label className='block text-gray-700 text-sm font-semibold mb-2 shadow-text'>
							<FaCalendarAlt className='inline mr-2 text-red-500' />
							Date
						</label>
						<input
							type='date'
							name='date'
							value={data.date}
							onChange={handleChange}
							className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all group-hover:border-blue-400'
							required
						/>
					</div>

					<div className='relative group'>
						<label className='block text-gray-700 text-sm font-semibold mb-2 shadow-text'>
							<FaCommentAlt className='inline mr-2 text-yellow-500' />
							Remark
						</label>
						<textarea
							name='remark'
							value={data.remark}
							onChange={handleChange}
							placeholder='Enter additional here'
							className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all group-hover:border-blue-400'
							rows='2'></textarea>
					</div>

					<div className='relative group'>
						<label className='block text-gray-700 text-sm font-semibold mb-2 shadow-text'>
							<FaCreditCard className='inline mr-2 text-indigo-500' />
							Payment Mode
						</label>
						<select
							name='paymentMode'
							value={data.paymentMode}
							onChange={handleChange}
							className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all group-hover:border-blue-400'
							required>
							<option value=''>Select Payment Mode</option>
							<option value='Credit Card'>Credit Card</option>
							<option value='Debit Card'>Debit Card</option>
							<option value='Cash'>Cash</option>
						</select>
					</div>
				</div>

				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
					Update
				</button>
			</form>
		</div>
	);
};

export default EditTransaction;
