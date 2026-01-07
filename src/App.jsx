import { useReducer, useRef, useContext, useMemo, useCallback } from "react";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { movieReducer } from "./reducer/movieReducer";
import MovieApp from "./components/MovieForm";

// Idhu thaan unga UI logic ellathaiyum vachirukkum
function MainContent() {
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
    const watched = movies.filter((m) => m.watched).length;
    return {
      total: movies.length,
      watched,
    };
  }, [movies]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${dark ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-md ${dark ? "bg-zinc-800 text-white" : "bg-white text-black"}`}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
          
          {/* Input and Add Section */}
          <div className="flex gap-2 mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Add a movie..."
              className="flex-1 p-2 border rounded text-black"
            />
            <button 
              onClick={addMovie}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded text-white ${dark ? "bg-green-600" : "bg-green-500"}`}
            >
              {dark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            </button>
          </div>
        </div>

        {/* Movie List - Indha component dhaan unga list-ah kaatum */}
        <MovieApp movies={movies} dispatch={dispatch} />

        {/* Stats Section */}
        <div className="mt-6 text-center text-sm font-medium border-t pt-4">
          <p>Total Movies: {stats.total}</p>
          <p>Watched Movies: {stats.watched}</p>
        </div>
      </div>
    </div>
  );
}

// Main Export - Indha component dhaan ThemeProvider-ai wrap pannum
export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}