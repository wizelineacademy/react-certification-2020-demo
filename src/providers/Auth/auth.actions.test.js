import { ACTIONS, loginAction, logoutAction } from './auth.actions';
import loginApi from '../../api/login.api';

jest.mock('../../api/login.api', () => jest.fn());

const mockedUser = {
  id: '123',
  name: 'Wizeline',
  avatarUrl: 'avatar.jpg',
};

const dispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('loginAction', () => {
  it('handles successful login', async () => {
    loginApi.mockResolvedValue(mockedUser);

    await loginAction(dispatch)('username', 'password');

    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: ACTIONS.LOGIN_SUCCESS,
        payload: { user: mockedUser },
      })
    );
  });

  it('handles login error', async () => {
    loginApi.mockRejectedValue(new Error('Login error'));

    await loginAction(dispatch)('username', 'password');

    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: ACTIONS.LOGIN_ERROR,
        payload: { error: 'Login error' },
      })
    );
  });
});

describe('logoutAction', () => {
  it('handles logout action', () => {
    logoutAction(dispatch)();

    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: ACTIONS.LOGOUT })
    );
  });
});
