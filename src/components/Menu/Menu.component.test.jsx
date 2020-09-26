import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useHistory } from 'react-router-dom';

import Menu from './Menu.component';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

const mockedProps = {
  toggleDrawer: jest.fn(),
  open: true,
};
const mockedAuth = { isLoggedIn: false };

describe('Menu.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders links to public sections', () => {
    useAuth.mockReturnValue(mockedAuth);

    render(<Menu {...mockedProps} />);

    expect(screen.getByRole('button', { name: 'Home' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Favorites' })).toBeFalsy();
  });

  it('renders links to private sections', () => {
    useAuth.mockReturnValue({ ...mockedAuth, isLoggedIn: true });

    render(<Menu {...mockedProps} />);

    expect(screen.getByRole('button', { name: 'Home' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Favorites' })).toBeTruthy();
  });

  it('calls navigation when clicking links', () => {
    const mockedPush = jest.fn();

    useAuth.mockReturnValue(mockedAuth);
    useHistory.mockReturnValue({ push: mockedPush });

    render(<Menu {...mockedProps} />);

    const homeButton = screen.getByRole('button', { name: 'Home' });

    fireEvent.click(homeButton);

    expect(mockedPush).toHaveBeenCalledWith('/');
  });

  it('closes the menu', () => {
    useAuth.mockReturnValue(mockedAuth);

    render(<Menu {...mockedProps} />);

    const [, closeMenu] = screen.getAllByRole('presentation');

    fireEvent.click(closeMenu);

    expect(mockedProps.toggleDrawer).toHaveBeenCalledWith(false);
  });
});
