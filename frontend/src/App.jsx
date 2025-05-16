import FilterableMovieCatalog from './components/FilterableMovieCatalog';

function App() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,theme(colors.violet.950),theme(colors.gray.900),black)] px-4"
    >
      <header className="absolute top-20 left-0 right-0 text-center px-4">
        <h1 className="glow-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white">
          Movie Viewer 🍿
        </h1>
      </header>

      <main className="mt-20 flex-grow flex items-center justify-center px-32">
        <FilterableMovieCatalog />
      </main>
    </div>
  );
}

export default App;
