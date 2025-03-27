import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function AddMovieCard({ printData }) {
	const [newCard, setNewCard] = useState({
		title: "",
		genre: "",
		rating: "",
		description: "",
		director: "",
		cast: "",
		releaseDate: "",
		likes: "",
		image: "",
	});
	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;
		setNewCard((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	function updateData() {
		// Format genre and cast as arrays if they're strings
		const formattedData = {
			...newCard,
			genre: Array.isArray(newCard.genre) ? newCard.genre : newCard.genre.split(',').map(item => item.trim()),
			cast: Array.isArray(newCard.cast) ? newCard.cast : newCard.cast.split(',').map(item => item.trim()),
		};

		axios.post("http://localhost:8080/add", formattedData)
			.then(() => {
				printData();
				setNewCard({
					title: "",
					genre: "",
					rating: "",
					description: "",
					director: "",
					cast: "",
					releaseDate: "",
					likes: "",
					image: "",
				});
				navigate("/"); // Ensure this line is present
			})
			.catch((err) => {
				console.error("Error adding movie:", err);
			});
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<button 
						onClick={() => navigate('/')}
						className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
					>
						<FaArrowLeft /> Back to Movies
					</button>
					<h1 className="text-3xl font-bold text-purple-600">Add New Movie</h1>
					<div className="w-24"></div> {/* Spacer for alignment */}
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
							<input
								type="text"
								name="title"
								value={newCard.title}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
								placeholder="Movie title"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
							<input
								type="text"
								name="director"
								value={newCard.director}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
								placeholder="Director name"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
							<input
								type="text"
								name="genre"
								value={newCard.genre}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
								placeholder="Action, Drama, Comedy (comma separated)"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Cast</label>
							<input
								type="text"
								name="cast"
								value={newCard.cast}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
								placeholder="Actor names (comma separated)"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-10)</label>
							<input
								type="number"
								name="rating"
								value={newCard.rating}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
								placeholder="Rating out of 10"
								min="1"
								max="10"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Likes</label>
							<input
								type="number"
								name="likes"
								value={newCard.likes}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
								placeholder="Number of likes"
								min="0"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
							<input
								type="date"
								name="releaseDate"
								value={newCard.releaseDate}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
							/>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
							<input
								type="text"
								name="image"
								value={newCard.image}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
								placeholder="https://example.com/image.jpg"
							/>
						</div>
					</div>
					
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
						<textarea
							name="description"
							value={newCard.description}
							onChange={handleChange}
							rows="4"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
							placeholder="Movie description"
						></textarea>
					</div>
					
					<div className="mt-8 text-center">
						<button
							onClick={updateData}
							className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold transform transition duration-300 hover:scale-105 hover:shadow-lg"
						>
							Add Movie
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddMovieCard;
