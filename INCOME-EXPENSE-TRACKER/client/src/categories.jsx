import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Add this import

function Categories() {
	useEffect(() => {
		getCategories();
	}, []);
	const [category, setCategory] = useState([]);
	const navigate = useNavigate(); // Add this line

	async function getCategories() {
		await axios.get("http://localhost:8080/category").then((response) => {
			setCategory(response.data);
		});
	}

	async function deleteCategory(id) {
		try {
			await axios.delete(`http://localhost:8080/category/delete/${id}`).then(() => {
				alert("Category is deleted successfully");
				getCategories();
			});
		} catch (error) {
			console.error("Category is not deleted :", error);
		}
	}

	return (
		<>
			<div className='container mx-auto p-6'>
				<div className='overflow-x-auto rounded-lg shadow-lg'>
					<table className='w-full bg-white'>
						<thead>
							<tr className='bg-gray-800 text-white text-left hover:bg-gray-700 transition-all duration-300'>
								<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Name</th>
								<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm'>Type</th>
								<th className='py-3 px-4 font-semibold text-sm uppercase tracking-wider shadow-sm text-right'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{category.map((row) => (
								<tr key={row._id} className='hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.01] cursor-pointer'>
									<td className='py-3 px-4 text-sm text-gray-800'>{row.name}</td>
									<td className='py-3 px-4 text-sm text-gray-800'>{row.type}</td>
									<td className='py-3 px-4 text-right'>
										<div className='flex justify-end gap-3'>
											<button
												onClick={() => {
													navigate(`/category/edit-category/${row._id}`);
												}}
												className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 hover:scale-105'
												aria-label='Edit'>
												<FaEdit className='w-4 h-4' />
											</button>
											<button
												onClick={() => deleteCategory(row._id)}
												className='p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 hover:scale-105'
												aria-label='Delete'>
												<FaTrash className='w-4 h-4' />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className='flex flex-col sm:flex-row gap-4 p-4 mt-5 ml-3'>
				<button
					onClick={() => navigate("/category/add-category")}
					className='inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:shadow-2xl hover:bg-green-600 hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out group'
					aria-label='Add Category'>
					<FaPlus className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300' />
					<span className='font-semibold'>Add Category</span>
				</button>
			</div>
		</>
	);
}
export default Categories;
