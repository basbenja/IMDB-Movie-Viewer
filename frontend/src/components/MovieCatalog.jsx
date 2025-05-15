import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MovieCard from "./MovieCard";

function ArrowButton({ direction, onClick, disabled }) {
  const svg_path = direction === "right" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-full items-center justify-center flex transition shadow-md
      ${disabled ? "bg-gray-500 opacity-50" : "cursor-pointer bg-violet-600 text-white hover:bg-violet-500  hover:scale-105"}`}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={svg_path} />
      </svg>
    </button>
  );
}

function MovieCatalog ({ movies, onPageChange, currentPage, totalPages }) {
  const [direction, setDirection] = useState(0);

  function handlePrev() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <ArrowButton
        direction="left"
        onClick={handlePrev}
        disabled={currentPage === 1}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence mode="wait">
          {movies.map((movie) => (
            <motion.div
              key={movie.title + movie.year}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard {...movie} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ArrowButton
        direction="right"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default MovieCatalog;
