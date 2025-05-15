function SearchBar ({ searchTerm, onSearchTermChange }) {
  return (
    <form className="w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search for a movie by its title..."
        className="w-full text-white px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </form>
  );
};

export default SearchBar;
