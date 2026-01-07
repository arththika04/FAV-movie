import { useMemo } from "react";

function MovieStats({ movies }) {
  const total = useMemo(() => movies.length, [movies]);
  const watched = useMemo(
    () => movies.filter((m) => m.watched).length,
    [movies]
  );

  return (
    <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
      <p>Total movies: {total}</p>
      <p>Watched movies: {watched}</p>
    </div>
  );
}

export default MovieStats;
