import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useUserPreferences } from '../../providers/UserPreferences';

import ThemeSwitch from './ThemeSwitch.component';

jest.mock('../../providers/UserPreferences', () => ({
  useUserPreferences: jest.fn(),
}));

const mockedUserPreferences = {
  isLightTheme: true,
  setInverseTheme: jest.fn(),
};

describe('ThemeSwitch.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provided theme from userPreferences', () => {
    useUserPreferences.mockReturnValue(mockedUserPreferences);

    render(<ThemeSwitch />);

    const themeSwitch = screen.getByLabelText('theme switch');

    fireEvent.click(themeSwitch);

    expect(mockedUserPreferences.setInverseTheme).toHaveBeenCalledTimes(1);
  });
});
