export const movieReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), title: action.title, watched: false },
      ];

    case "TOGGLE":
      return state.map(movie =>
        movie.id === action.id
          ? { ...movie, watched: !movie.watched }
          : movie
      );

    case "REMOVE":
      return state.filter(movie => movie.id !== action.id);

    default:
      return state;
  }
};
