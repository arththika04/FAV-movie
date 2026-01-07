export const initialMovies = [];

export function moviesReducer(state, action) {
  switch (action.type) {
    case "ADD_MOVIE": {
      if (!action.title.trim()) return state;
      const newMovie = {
        id: Date.now(),
        title: action.title.trim(),
        watched: false,
      };
      return [...state, newMovie];
    }
    case "TOGGLE_WATCHED": {
      return state.map((m) =>
        m.id === action.id ? { ...m, watched: !m.watched } : m
      );
    }
    case "REMOVE_MOVIE": {
      return state.filter((m) => m.id !== action.id);
    }
    default:
      return state;
  }
}
