import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Navbar from './Navbar.component';

jest.mock('../SearchBar', () => () => <div>Mocked SearchBar</div>);
jest.mock('../ThemeSwitch', () => () => <div>Mocked ThemeSwitch</div>);
jest.mock('../LoginPrompt', () => () => <div>Mocked LoginPrompt</div>);
jest.mock('../LoginMenu', () => () => <div>Mocked LoginMenu</div>);

const mockedProps = {
  toggleDrawer: jest.fn(),
};

describe('Navbar.component', () => {
  it('renders Navbar elements', () => {
    render(<Navbar {...mockedProps} />);

    expect(screen.getByText('Mocked SearchBar')).toBeTruthy();
    expect(screen.getByText('Mocked ThemeSwitch')).toBeTruthy();
    expect(screen.getByText('Mocked LoginPrompt')).toBeTruthy();
    expect(screen.getByText('Mocked LoginMenu')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'open drawer' })).toBeTruthy();
  });

  it('toggles drawer menu', () => {
    render(<Navbar {...mockedProps} />);

    const drawerToggleButton = screen.getByRole('button', { name: 'open drawer' });

    fireEvent.click(drawerToggleButton);

    expect(mockedProps.toggleDrawer).toHaveBeenCalledWith(true);
  });
});
