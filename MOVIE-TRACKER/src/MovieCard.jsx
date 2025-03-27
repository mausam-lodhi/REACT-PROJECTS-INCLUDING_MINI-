import { FaStar, FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this import

const MovieCard = ({ _id, image, title, genre, description, director, cast, releaseDate, rating, likes, printCards }) => {
	const navigate = useNavigate();

	function deleteCard(id) {
		return () => {
			axios.delete(`http://localhost:8080/delete/${id}`)
				.then(() => {
					printCards();
				})
				.catch((err) => {
					console.log(err);
				});
		};
	}
	
	function updateCard(id) {
		return () => {
			axios.put(`http://localhost:8080/update/${id}`)
				.then(() => {
					printCards();
				})
				.catch((err) => {
					console.log(err);
				});
		};
	}

	// Format the release date for better display
	const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	return (
		<div className='w-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white mx-4 my-6 text-sm'>
			<div className='relative'>
				<img
					src={image.startsWith('http') ? image : `https://${image}`}
					alt={title}
					className='w-full h-48 object-cover'
					onError={(e) => {
						e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3";
					}}
				/>
				<div className='absolute top-2 right-2 bg-white/80 rounded-full p-1.5'>
					<div className='flex items-center space-x-1'>
						<FaStar className='text-yellow-500' />
						<span className='text-xs font-bold'>{rating}/10</span>
					</div>
				</div>
			</div>

			<div className='px-4 py-3'>
				<div className='font-bold text-lg mb-2 text-gray-800 line-clamp-1'>{title}</div>

				<div className='flex flex-wrap gap-1.5 mb-3'>
					{genre.map((g, index) => (
						<span key={index} className='px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full'>
							{g}
						</span>
					))}
				</div>

				<p className='text-gray-600 text-xs mb-3 line-clamp-2'>{description}</p>

				<div className='text-xs text-gray-600 space-y-1'>
					<p>
						<span className='font-semibold'>Director:</span> {director}
					</p>
					<p>
						<span className='font-semibold'>Cast:</span> {cast.join(", ")}
					</p>
					<p>
						<span className='font-semibold'>Release:</span> {formattedDate}
					</p>
				</div>

				<div className='mt-3 flex items-center text-xs text-gray-500'>
					<FaHeart className='text-red-500 mr-1' />
					<span>{likes} likes</span>
				</div>

				<div className='mt-4 flex justify-between gap-3'>
					<button
						className='flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md text-sm transition-colors duration-200'
						onClick={() => {
							navigate("/edit-movie", { state: { movie: { _id, image, title, genre, description, director, cast, releaseDate, rating, likes } } });
						}}>
						<FaEdit />
						Edit
					</button>
					<button
						className='flex-1 flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded-md text-sm transition-colors duration-200'
						onClick={deleteCard(_id)}>
						<FaTrash />
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
