export const ACTIONS = {
  ADD_FAVORITE_VIDEO: 'ADD_FAVORITE_VIDEO',
  REMOVE_FAVORITE_VIDEO: 'REMOVE_FAVORITE_VIDEO',
  SET_INVERSE_THEME: 'SET_INVERSE_THEME',
};

export const addFavoriteVideoAction = (dispatch) => (video) => {
  dispatch({
    type: ACTIONS.ADD_FAVORITE_VIDEO,
    payload: { video },
  });
};

export const removeFavoriteVideoAction = (dispatch) => (video) => {
  dispatch({
    type: ACTIONS.REMOVE_FAVORITE_VIDEO,
    payload: { video },
  });
};

export const setInverseThemeAction = (dispatch) => () => {
  dispatch({
    type: ACTIONS.SET_INVERSE_THEME,
  });
};
