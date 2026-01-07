import { useReducer, useContext, useCallback } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import { moviesReducer, initialMovies } from "./moviesReducer";
import MovieForm from "./components/MovieForm";
import MovieItem from "./components/MovieItem";
import MovieStats from "./components/MovieStats";

function AppContent() {
  const [movies, dispatch] = useReducer(moviesReducer, initialMovies);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleAddMovie = useCallback(
    (title) => dispatch({ type: "ADD_MOVIE", title }),
    []
  );

  const handleToggleWatched = useCallback(
    (id) => dispatch({ type: "TOGGLE_WATCHED", id }),
    []
  );

  const handleRemoveMovie = useCallback(
    (id) => dispatch({ type: "REMOVE_MOVIE", id }),
    []
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="w-full max-w-md mx-auto p-5 rounded-lg shadow-md bg-white dark:bg-slate-900">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Movie List</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 text-xs rounded border border-gray-300 dark:border-gray-700"
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </header>

        <MovieForm onAdd={handleAddMovie} />

        <ul className="mb-2 max-h-64 overflow-y-auto">
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onToggle={handleToggleWatched}
              onRemove={handleRemoveMovie}
            />
          ))}
          {movies.length === 0 && (
            <p className="text-xs text-gray-500 mt-2">
              No movies yet. Add your first movie.
            </p>
          )}
        </ul>

        <MovieStats movies={movies} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
