import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import LoginMenu from './LoginMenu.component';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

const mockedProps = {
  setLoginDialogOpen: jest.fn(),
};
const mockedUser = {
  avatarUrl: 'avatar.jpg',
};
const mockedAuth = { user: mockedUser, isLoggedIn: false, logout: jest.fn() };

describe('LoginMenu.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders LoginMenu elements', () => {
    useAuth.mockReturnValue(mockedAuth);

    render(<LoginMenu {...mockedProps} />);

    const avatar = screen.getByAltText('Avatar');

    expect(screen.getByRole('button', { name: 'User profile dropdown' })).toBeTruthy();
    expect(avatar).toBeTruthy();
    expect(avatar.getAttribute('src')).toBe(mockedUser.avatarUrl);
  });

  it('toggles LoginDialog when clicking on login menu', () => {
    useAuth.mockReturnValue(mockedAuth);

    render(<LoginMenu {...mockedProps} />);

    const loginButton = screen.getByText('Login');

    fireEvent.click(loginButton);

    expect(loginButton).toBeTruthy();
    expect(mockedProps.setLoginDialogOpen).toHaveBeenCalledWith(true);
  });

  it('triggers logout action when clicking logout button', () => {
    useAuth.mockReturnValue({ ...mockedAuth, isLoggedIn: true });

    render(<LoginMenu {...mockedProps} />);

    const logoutButton = screen.getByText('Logout');

    fireEvent.click(logoutButton);

    expect(logoutButton).toBeTruthy();
    expect(mockedAuth.logout).toHaveBeenCalledTimes(1);
  });
});
