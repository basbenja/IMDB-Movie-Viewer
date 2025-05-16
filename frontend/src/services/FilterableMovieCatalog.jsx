import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL

export async function fetchMovies(page, moviesPerPage, searchTerm, setMovies, setTotalPages) {
  try {
    const response = await axios.get(
        `${backendURL}/movies?page=${page}&limit=${moviesPerPage}&title=${searchTerm}`
    );
    setMovies(response.data.movies);
    setTotalPages(response.data.total_pages);
  } catch (error) {
    console.error("Error fetching movies:", error);
    setMovies([]);
  }
}