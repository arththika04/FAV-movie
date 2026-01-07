import { useReducer, useRef, useContext, useMemo, useCallback } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import { movieReducer } from "./movieReducer";

function MovieApp() {
  const [movies, dispatch] = useReducer(movieReducer, []);
  const inputRef = useRef();
  const { dark, toggleTheme } = useContext(ThemeContext);

  const addMovie = useCallback(() => {
    if (!inputRef.current.value) return;
    dispatch({ type: "ADD", title: inputRef.current.value });
    inputRef.current.value = "";
    inputRef.current.focus();
  }, []);

  const stats = useMemo(() => {
    const watched = movies.filter(m => m.watched).length;
    return {
      total: movies.length,
      watched,
    };
  }, [movies]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">🎬 Favorite Movies</h1>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          className="flex-1 p-2 border rounded"
          placeholder="Add movie..."
          autoFocus
        />
        <button
          onClick={addMovie}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {movies.map(movie => (
          <li
            key={movie.id}
            className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded"
          >
            <span className={movie.watched ? "line-through" : ""}>
              {movie.title}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE", id: movie.id })
                }
                className="text-sm bg-blue-500 text-white px-2 rounded"
              >
                Watched
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE", id: movie.id })
                }
                className="text-sm bg-red-500 text-white px-2 rounded"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm">
        Total: {stats.total} | Watched: {stats.watched}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MovieApp />
    </ThemeProvider>
  );
}
