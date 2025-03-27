import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Transactions() {
	const [transactions, setTransactions] = useState([]);
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	function getTransactions() {
		axios.get("http://localhost:8080/transactions").then((response) => {
			setTransactions(response.data);
		});
	}

	useEffect(() => {
		getTransactions();
		getCategories();
	}, []);

	async function getCategories() {
		try {
			const response = await axios.get("http://localhost:8080/categories");
			setCategories(response.data);
		} catch (error) {
			console.error("Error fetching categories: ", error);
		}
	}

	async function deleteTransaction(id) {
		await axios.delete(`http://localhost:8080/transactions/delete/${id}`);
		getTransactions();
	}

	return (
		<div className='w-full p-6'>
			<div className='overflow-x-auto rounded-lg shadow-lg'>
				<table className='w-full bg-white'>
					<thead>
						<tr className='bg-gray-800 text-white text-left hover:bg-gray-700 transition-all duration-300'>
							<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Amount</th>
							<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Type</th>
							<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Category</th>
							<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Date</th>
							<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Remark</th>
							<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Payment Mode</th>
							<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200'>
						{transactions.map((row) => {
							const category = categories.find((cat) => cat._id === row.category);
							return (
								<tr key={row._id} className='hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.01]'>
									<td className='py-3 px-4 text-sm'>{row.amount}</td>
									<td className='py-3 px-4 text-sm'>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												row.type === "Income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
											}`}>
											{row.type}
										</span>
									</td>
									<td className='py-3 px-4 text-sm'>{category ? category.name : "Unknown"}</td>
									<td className='py-3 px-4 text-sm'>{new Date(row.date).toLocaleDateString()}</td>
									<td className='py-3 px-4 text-sm'>{row.remark}</td>
									<td className='py-3 px-4 text-sm'>{row.paymentMode}</td>
									<td className='py-3 px-4 text-sm'>
										<div className='flex space-x-2'>
											<button
												onClick={() => navigate(`/transaction/edit-transaction/${row._id}`)}
												className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 hover:scale-105'
												aria-label='Edit'>
												<FaEdit className='w-4 h-4' />
											</button>
											<button
												onClick={() => deleteTransaction(row._id)}
												className='p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 hover:scale-105'
												aria-label='Delete'>
												<FaTrash className='w-4 h-4' />
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<button
				onClick={() => navigate("/transaction/add-transaction")}
				className='inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:shadow-2xl hover:bg-green-600 hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out group mt-10'
				aria-label='Add Transaction'>
				<span className='font-semibold'>Add Transaction</span>
			</button>
		</div>
	);
}

export default Transactions;
