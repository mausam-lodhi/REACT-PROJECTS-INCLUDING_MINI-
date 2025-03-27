import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditCard({ printData }) {
	const location = useLocation();
	const navigate = useNavigate();
	const movie = location.state.movie;

	const [updatedCard, setUpdatedCard] = useState(movie);

	function handleChange(e) {
		const { name, value } = e.target;
		setUpdatedCard((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	function handleSubmit() {
		axios.put(`http://localhost:8080/update/${movie._id}`, updatedCard)
			.then(() => {
				printData();
				navigate("/"); // Ensure this line is present
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className='w-screen p-6'>
			<h1 className='text-4xl font-bold text-purple-600 mb-8 text-center animate-pulse'>Edit Movie</h1>
			<div className='overflow-x-auto rounded-lg shadow-xl'>
				<table className='w-full bg-white'>
					<thead>
						<tr className='bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
							{["Title", "Genre", "Rating", "Director", "Cast", "Release Date", "Likes", "Description", "Image"].map((header) => (
								<th key={header} className='px-6 py-4 font-semibold text-left transition duration-300 hover:bg-purple-700'>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr className='border-b hover:bg-purple-50 transition duration-300'>
							<td className='px-6 py-4'>
								<input
									type='text'
									name='title'
									value={updatedCard.title}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='Title'
								/>
							</td>
							<td className='px-6 py-4'>
								<input
									type='text'
									name='genre'
									value={updatedCard.genre}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='Genre'
								/>
							</td>
							<td className='px-6 py-4'>
								<input
									type='number'
									name='rating'
									value={updatedCard.rating}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='Rating'
									min='1'
									max='10'
								/>
							</td>
							<td className='px-6 py-4'>
								<input
									type='text'
									name='director'
									value={updatedCard.director}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='Director'
								/>
							</td>
							<td className='px-6 py-4'>
								<input
									type='text'
									name='cast'
									value={updatedCard.cast}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='Cast'
								/>
							</td>
							<td className='px-6 py-4'>
								<input
									type='date'
									name='releaseDate'
									value={updatedCard.releaseDate}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
								/>
							</td>
							<td className='px-6 py-4'>
								<input
									type='text'
									name='likes'
									value={updatedCard.likes}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='Likes'
								/>
							</td>
							<td className='px-6 py-4'>
								<textarea
									name='description'
									value={updatedCard.description}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='Description'></textarea>
							</td>
							<td className='px-6 py-4'>
								<input
									type='text'
									name='image'
									value={updatedCard.image}
									onChange={handleChange}
									className='w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none'
									placeholder='url'
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='mt-8 text-center'>
				<button
					onClick={handleSubmit}
					// Ensure this line is present
					className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold transform transition duration-300 hover:scale-105 hover:shadow-lg'>
					Submit
				</button>
			</div>
		</div>
	);
}

export default EditCard;
