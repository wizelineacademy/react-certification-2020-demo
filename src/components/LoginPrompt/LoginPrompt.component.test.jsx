import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import LoginPrompt from './LoginPrompt.component';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

const mockedProps = {
  isOpen: true,
  close: jest.fn(),
};
const mockedAuth = { login: jest.fn(), loading: false, error: false };

describe('LoginPrompt.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders LoginPropmt elements', () => {
    useAuth.mockReturnValue(mockedAuth);

    render(<LoginPrompt {...mockedProps} />);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeTruthy();
    expect(screen.getByLabelText('Username')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();
  });

  it('triggers login with login data', () => {
    useAuth.mockReturnValue(mockedAuth);

    render(<LoginPrompt {...mockedProps} />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(loginButton);

    expect(mockedAuth.login).toHaveBeenCalledWith('username', 'password');
  });

  it('changes Login button text while logging in', () => {
    useAuth.mockReturnValue({ ...mockedAuth, loading: true });

    render(<LoginPrompt {...mockedProps} />);

    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeTruthy();
  });

  it('disables inputs while performing login', () => {
    useAuth.mockReturnValue({ ...mockedAuth, loading: true });

    render(<LoginPrompt {...mockedProps} />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    expect(usernameInput.getAttribute('disabled')).toBeDefined();
    expect(passwordInput.getAttribute('disabled')).toBeDefined();
    expect(
      screen.getByRole('button', { name: 'Cancel' }).getAttribute('disabled')
    ).toBeDefined();
    expect(
      screen.getByRole('button', { name: 'Logging in...' }).getAttribute('disabled')
    ).toBeDefined();
  });

  it('renders nothing when LoginPropmt is closed', () => {
    useAuth.mockReturnValue(mockedAuth);

    const { container } = render(<LoginPrompt {...mockedProps} isOpen={false} />);

    expect(container.children.length).toBe(0);
  });
});
