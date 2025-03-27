import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import AddMovieCard from "./addMovieCard";
import AddMovieButton from "./addMovieButton";
import EditMovieCard from "./editCard";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	const [tabledata, setTabledata] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		printCards();
	}, []);

	function printCards() {
		setLoading(true);
		axios.get("http://localhost:8080/get")
			.then((res) => {
				setTabledata(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<div className='min-h-screen bg-gray-50'>
							<Header />
							<main className='container mx-auto px-4 py-8'>
								<h1 className='text-3xl font-bold text-center text-purple-600 mb-8'>Movie Collection</h1>
								
								{loading ? (
									<div className='flex justify-center items-center h-64'>
										<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
									</div>
								) : tabledata.length > 0 ? (
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
										{tabledata.map((data, index) => (
											<MovieCard key={index} {...data} printCards={printCards} />
										))}
									</div>
								) : (
									<div className='text-center py-12'>
										<p className='text-xl text-gray-600'>No movies found. Add some movies to your collection!</p>
									</div>
								)}
								
								<AddMovieButton />
							</main>
							<Footer />
						</div>
					}
				/>
				<Route path='/add-movie' element={<AddMovieCard printData={printCards} />} />
				<Route path='/edit-movie' element={<EditMovieCard printData={printCards} />} />
			</Routes>
		</Router>
	);
}

export default App;
