import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App.component';
import { useGapi } from '../../utils/hooks/useGapi';

jest.mock('../../utils/hooks/useGapi', () => ({
  useGapi: jest.fn(),
}));

describe('App.component', () => {
  beforeAll(() => {
    window.gapi = {
      load: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    delete window.gapi;
  });

  it('renders Gapi error', () => {
    useGapi.mockReturnValue([null, true]);

    render(<App />);

    expect(screen.getByText('Error loading app')).toBeTruthy();
  });

  it('renders loading component while loading Gapi', () => {
    useGapi.mockReturnValue([null, false]);

    render(<App />);

    expect(screen.getByLabelText('audio-loading')).toBeTruthy();
  });

  it('renders the app when Gapi is ready', () => {
    useGapi.mockReturnValue([{}, false]);

    render(<App />);

    expect(screen.getByText('Welcome to the Challenge!')).toBeTruthy();
  });
});
