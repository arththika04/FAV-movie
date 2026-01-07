import { useCallback } from "react";

function MovieItem({ movie, onToggle, onRemove }) {
  const handleToggle = useCallback(() => onToggle(movie.id), [movie.id, onToggle]);
  const handleRemove = useCallback(() => onRemove(movie.id), [movie.id, onRemove]);

  return (
    <li className="flex items-center justify-between px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 mb-2">
      <div>
        <p
          className={`text-sm ${
            movie.watched ? "line-through text-gray-500" : ""
          }`}
        >
          {movie.title}
        </p>
        <span className="text-xs text-gray-500">
          Status: {movie.watched ? "Watched" : "Not watched"}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className="px-2 py-1 text-xs rounded bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Toggle watched
        </button>
        <button
          onClick={handleRemove}
          className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default MovieItem;
