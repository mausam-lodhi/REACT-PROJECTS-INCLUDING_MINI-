import { useState } from "react";
import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddMovieButton = () => {
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();

	return (
		<div className='flex justify-center'>
			<button
				onClick={() => navigate("/add-movie")}
				className={`
          relative
          inline-flex
          items-center
          gap-2
          px-6
          py-3
          text-sm
          font-medium
          text-white
          transition-all
          duration-300
          ease-in-out
          bg-gradient-to-r
          from-blue-500
          to-indigo-600
          rounded-full
          hover:from-blue-600
          hover:to-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          shadow-lg
          hover:shadow-xl
          transform
          hover:-translate-y-0.5
          active:translate-y-0
          disabled:opacity-50
          disabled:cursor-not-allowed
          sm:text-base
          sm:px-8
          sm:py-4
          md:text-lg
          md:px-10
          md:py-4
        `}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				aria-label='Add new movie'
				role='button'>
				<span className='relative z-10 flex items-center justify-center gap-2'>
					<FaFilm className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`} aria-hidden='true' />
					<span className='hidden sm:inline'>Add Movie</span>
				</span>
				<div className='absolute inset-0 rounded-full overflow-hidden' aria-hidden='true'>
					<div
						className={`
              absolute
              inset-0
              transition-opacity
              duration-300
              bg-gradient-to-r
              from-blue-600/50
              to-indigo-700/50
              opacity-0
              ${isHovered ? "opacity-100" : ""}
            `}
					/>
				</div>
				<div
					className='absolute inset-0 rounded-full blur-sm bg-gradient-to-r from-blue-500/50 to-indigo-600/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
					aria-hidden='true'
				/>
			</button>
		</div>
	);
};

export default AddMovieButton;
