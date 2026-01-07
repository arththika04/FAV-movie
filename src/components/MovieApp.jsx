import { useRef, useCallback } from "react";

function MovieForm({ onAdd }) {
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const value = inputRef.current.value;
      onAdd(value);
      inputRef.current.value = "";
      inputRef.current.focus();
    },
    [onAdd]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a movie..."
        className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}

export default MovieForm;
