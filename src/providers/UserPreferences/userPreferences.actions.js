const ACTIONS = {
  ADD_FAVORITE_VIDEO: 'ADD_FAVORITE_VIDEO',
  REMOVE_FAVORITE_VIDEO: 'REMOVE_FAVORITE_VIDEO',
  SET_INVERSE_THEME: 'SET_INVERSE_THEME',
};

const addFavoriteVideoAction = (dispatch) => (video) => {
  dispatch({
    type: ACTIONS.ADD_FAVORITE_VIDEO,
    payload: { video },
  });
};

const removeFavoriteVideoAction = (dispatch) => (video) => {
  dispatch({
    type: ACTIONS.REMOVE_FAVORITE_VIDEO,
    payload: { video },
  });
};

const setInverseThemeAction = (dispatch) => () => {
  dispatch({
    type: ACTIONS.SET_INVERSE_THEME,
  });
};

export {
  ACTIONS,
  addFavoriteVideoAction,
  removeFavoriteVideoAction,
  setInverseThemeAction,
};
