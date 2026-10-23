
function favouritesReducer(state, action) {
  if (action.type === 'LOAD_FAVOURITES') {
    return action.photoIds;
  }

  if (action.type === 'TOGGLE_FAVOURITE') {
    const photoId = action.photoId;

    if (state.includes(photoId)) {
      return state.filter(function (id) {
        return id !== photoId;
      });
    }

    return [...state, photoId];
  }

  return state;
}

export default favouritesReducer;
