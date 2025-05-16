import { fetchMovies } from '../services/FilterableMovieCatalog';
import { useState, useEffect } from 'react';
import MovieCatalog from './MovieCatalog';
import SearchBar from './SearchBar';
import FileUploader from './FileUploader';

const backendURL = import.meta.env.VITE_BACKEND_URL

function FilterableMovieCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadSuccess, setUploadSucess] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(5);
  const [currentFile, setCurrentFile] = useState(null);

  function handleSearchTermChange(term) {
    setSearchTerm(term);
    setPage(1);
  };

  function handleFileUploadSuccess(success, file) {
    setCurrentFile(file);
    setPage(1);
    setUploadSucess(success);
  }

  useEffect(() => {
    function updateMoviesPerPage() {
      const width = window.innerWidth;

      if (width >= 1280) setMoviesPerPage(5);
      else if (width >= 1024) setMoviesPerPage(4);
      else if (width >= 768) setMoviesPerPage(3);
      else if (width >= 640) setMoviesPerPage(2);
      else setMoviesPerPage(1);
    }

    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);
  }, []);

  useEffect(() => {
    if (!uploadSuccess) return;

    fetchMovies(page, moviesPerPage, searchTerm, setMovies, setTotalPages);
  }, [page, currentFile, searchTerm, uploadSuccess, moviesPerPage]);

  if (!uploadSuccess) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-4 text-gray-500">
            No movies available yet! Click the button below to upload your movies file.
        </h2>
        <FileUploader onUploadSucess={handleFileUploadSuccess} />
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center justify-center 2xl:w-380 mx-auto">
        <div className="flex flex-row items-center justify-center gap-4 w-full max-w-4xl mb-6">
          <SearchBar searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
          <FileUploader onUploadSucess={handleFileUploadSuccess} />
        </div>

        <MovieCatalog
          movies={movies}
          onPageChange={setPage}
          currentPage={page}
          totalPages={totalPages}
          moviesPerPage={moviesPerPage}
        />
      </div>
    )
  }
}

export default FilterableMovieCatalog;