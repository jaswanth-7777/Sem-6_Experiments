export const initialState = {
  favorites: [],
  theme: "dark"
}

export function appReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] }
    case "REMOVE_FAVORITE":
      return { ...state, favorites: state.favorites.filter(f => f.id !== action.payload) }
    case "CLEAR_FAVORITES":
      return { ...state, favorites: [] }
    default:
      return state
  }
}
