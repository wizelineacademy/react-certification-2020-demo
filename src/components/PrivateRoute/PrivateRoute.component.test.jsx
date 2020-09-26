import React from 'react';
import { render, screen } from '@testing-library/react';

import PrivateRoute from './PrivateRoute.component';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  Route: ({ render: renderMethod }) => renderMethod(),
  Redirect: () => <div>Mocked Redirect</div>,
}));

const mockedProps = {
  children: <div>Mocked Children</div>,
};

describe('PrivateRoute.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children if user is logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: true });

    render(<PrivateRoute {...mockedProps} />);

    expect(screen.getByText('Mocked Children')).toBeTruthy();
  });

  it('renders Redirect if user is not logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: false });

    render(<PrivateRoute {...mockedProps} />);

    expect(screen.queryByText('Mocked Children')).toBeFalsy();
    expect(screen.getByText('Mocked Redirect')).toBeTruthy();
  });
});
