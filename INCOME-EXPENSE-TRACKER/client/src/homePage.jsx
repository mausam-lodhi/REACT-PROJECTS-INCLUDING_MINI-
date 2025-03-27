import { FaListUl, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	const fallbackImageUrl = "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=150&h=150";

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start py-10 px-4'>
			<div className='w-full max-w-4xl flex flex-col items-center space-y-8'>
				<div className='flex flex-col items-center space-y-4'>
					<img
						src={fallbackImageUrl}
						alt='IETRACKER Logo'
						className='w-24 h-24 object-contain drop-shadow-xl hover:scale-110 hover:rotate-3 transition-all duration-300 hover:shadow-2xl rounded-full cursor-pointer filter hover:brightness-110'
						onError={(e) => {
							e.target.src = fallbackImageUrl;
						}}
					/>
					<h1 className='text-5xl md:text-6xl font-bold text-indigo-900 tracking-wider text-shadow-lg animate-fadeIn'>Choose</h1>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-4 mt-6'>
					<button
						onClick={() => {
							navigate("/category");
						}}
						className='group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 space-y-4'
						aria-label='Categories'>
						<div className='p-4 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors duration-300'>
							<FaListUl className='w-10 h-10 text-indigo-600 group-hover:text-indigo-700' />
						</div>
						<span className='text-xl font-semibold text-gray-800 tracking-wide text-shadow-sm group-hover:text-indigo-600'>CATEGORIES</span>
					</button>

					<button
						onClick={() => navigate("/transaction")}
						className='group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 space-y-4'
						aria-label='Transaction'>
						<div className='p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors duration-300'>
							<FaMoneyBillWave className='w-10 h-10 text-green-600 group-hover:text-green-700' />
						</div>
						<span className='text-xl font-semibold text-gray-800 tracking-wide text-shadow-sm group-hover:text-green-600'>TRANSACTION</span>
					</button>
				</div>
			</div>

			<style>{`
				:global(.text-shadow-lg) {
					text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
				}
				:global(.text-shadow-sm) {
					text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
				}
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				:global(.animate-fadeIn) {
					animation: fadeIn 0.5s ease-out;
				}
			`}</style>
		</div>
	);
};

export default HomePage;
