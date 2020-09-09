import loginApi from '../../api/login.api';

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
};

const loginAction = (dispatch) => async (username, password) => {
  dispatch({ type: ACTIONS.LOGIN });

  try {
    const user = await loginApi(username, password);

    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: { user },
    });
    return user;
  } catch (error) {
    dispatch({
      type: ACTIONS.LOGIN_ERROR,
      payload: { error: error.message },
    });
    return null;
  }
};

const logoutAction = (dispatch) => () => {
  dispatch({ type: ACTIONS.LOGOUT });
};

export { ACTIONS, loginAction, logoutAction };
