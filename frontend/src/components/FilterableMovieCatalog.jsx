import axios from "axios";
import NumberFlow from '@number-flow/react'
import { useState, useEffect } from 'react';
import MovieCatalog from './MovieCatalog';
import SearchBar from './SearchBar';
import FileUploader from './FileUploader';

function FilterableMovieCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(5);

  function handleSearchTermChange(term) {
    setSearchTerm(term);
    setPage(1);
  };

  useEffect(() => {
    function updateMoviesPerPage() {
      const width = window.innerWidth;

      if (width < 640) setMoviesPerPage(1); // sm
      else if (width < 768) setMoviesPerPage(2); // md
      else if (width < 1024) setMoviesPerPage(3); // lg
      else if (width < 1280) setMoviesPerPage(4); // xl
      else setMoviesPerPage(5); // 2xl and above
    }

    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);
  }, []);

  useEffect(() => {
    if (!uploadSuccess && movies.length === 0) return;

    async function fetchMovies() {
      try {
        const response = await axios.get(
          `http://localhost:5000/movies?page=${page}&limit=${moviesPerPage}&title=${searchTerm}`
        );
        if (response.status !== 200) throw new Error("Fetch failed");
        setMovies(response.data.movies);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    }

    fetchMovies();
  }, [page, searchTerm, uploadSuccess, moviesPerPage]); // re-run when page or uploadSuccess changes

  if (movies.length === 0 && !uploadSuccess) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-4 text-gray-500">
            No movies available yet! Click the button below to upload your movies file.
        </h2>
        <FileUploader onUploadSucess={setUploadSucess} />
      </div>
    )
  } else if (uploadSuccess) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-4 w-full max-w-4xl mb-6">
          <SearchBar searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
          <FileUploader onUploadSucess={setUploadSucess} />
        </div>

      {(movies.length === 0) ? (
        <h2 className="text-xl font-medium mb-4 text-gray-500">
            No movies found for the search term "{searchTerm}". Please try again.
        </h2>
      ) : (
        <MovieCatalog movies={movies} onPageChange={setPage} currentPage={page} totalPages={totalPages} />
      )}
        <h4 className="text-lg font-medium mt-6 text-gray-500">
          Page <NumberFlow value={page} /> of {totalPages}
        </h4>

      </div>
    )
  }
}

export default FilterableMovieCatalog;