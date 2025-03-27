import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
	const navigate = useNavigate();
	const [categoryData, setCategoryData] = useState({
		name: "",
		type: "Income",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", categoryData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategoryData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	function addCategory() {
		axios.post("http://localhost:8080/category/add-category", categoryData)
			.then(() => {
				navigate("/");

				alert("Category is added successfully");
			})
			.catch((error) => {
				console.error("Error adding category:", error);
			});
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full mx-auto space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 hover:text-gray-700 transition-colors duration-300 cursor-default'>Add Category</h2>
				</div>

				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<div className='rounded-md shadow-sm space-y-4'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
								Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								required
								className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm hover:border-indigo-400 hover:bg-gray-50 transition-all duration-300'
								placeholder='Enter category name'
								value={categoryData.name}
								onChange={handleChange}
								aria-label='Category name'
							/>
						</div>

						<div>
							<label htmlFor='type' className='block text-sm font-medium text-gray-700'>
								Type
							</label>
							<select
								id='type'
								name='type'
								required
								className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md hover:border-indigo-400 hover:bg-gray-50 transition-all duration-300'
								value={categoryData.type}
								onChange={handleChange}
								aria-label='Category type'>
								<option value='Income'>Income</option>
								<option value='Expense'>Expense</option>
							</select>
						</div>
					</div>

					<div>
						<button
							onClick={addCategory}
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out'>
							<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
								<FaPlus className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
							</span>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCategory;
