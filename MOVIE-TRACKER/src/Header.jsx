import { useState, useEffect } from "react";
import { FaHome, FaFilm, FaTv, FaList, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	const navLinks = [
		{ name: "Home", icon: <FaHome className='mr-2' /> },
		{ name: "Movies", icon: <FaFilm className='mr-2' /> },
		{ name: "TV Shows", icon: <FaTv className='mr-2' /> },
		{ name: "Watchlist", icon: <FaList className='mr-2' /> },
		{ name: "Contact", icon: <FaEnvelope className='mr-2' /> },
	];

	return (
		<>
			<header className={`fixed w-full top-0 z-50 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<FaFilm className='text-2xl text-blue-600' />
							<h1 className='text-xl font-bold'>Movie Tracker</h1>
						</div>

						<nav className='hidden md:flex items-center space-x-6'>
							{navLinks.map((link, index) => (
								<button
									key={index}
									className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
										darkMode ? "hover:bg-blue-700" : "hover:bg-blue-600"
									}`}
									aria-label={link.name}>
									{link.icon}
									<span>{link.name}</span>
								</button>
							))}
						</nav>

						<div className='flex items-center space-x-4'>
							<button
								onClick={toggleTheme}
								className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
									darkMode ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
								aria-label='Toggle theme'>
								{darkMode ? <FaSun className='text-xl' /> : <FaMoon className='text-xl' />}
							</button>

							<button
								className='md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
								aria-label='Menu'>
								<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className={`absolute w-full h-1 bottom-0 ${darkMode ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-blue-400 to-purple-400"}`}></div>
			</header>
			<main className={`mt-16`}>{/* Main content goes here */}</main>
		</>
	);
};

export default Header;
