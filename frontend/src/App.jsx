import FilterableMovieCatalog from './components/FilterableMovieCatalog';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      <h1 className="glow-text text-7xl font-semibold mb-10 text-center text-white">Movie Viewer 🍿</h1>
      <FilterableMovieCatalog />
    </div>
  );
}


export default App;
