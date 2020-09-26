import React from 'react';
import { render, screen } from '@testing-library/react';

import { useUserPreferences } from '../../providers/UserPreferences';
import { darkTheme } from '../../utils/theme';

import ThemedApp from './ThemedApp.component';

jest.mock('../../providers/UserPreferences', () => ({
  useUserPreferences: jest.fn(),
}));
jest.mock('../Router', () => () => <div>Mocked Router</div>);
jest.mock('@material-ui/core/styles', () => ({
  ThemeProvider: ({ theme }) => <div>Theme palette: {theme.palette.type}</div>,
  createMuiTheme: (theme) => theme,
}));

describe('ThemedApp.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provided theme from userPreferences', () => {
    useUserPreferences.mockReturnValue({ theme: darkTheme });

    render(<ThemedApp />);

    screen.getByText('Theme palette: dark');
  });
});
