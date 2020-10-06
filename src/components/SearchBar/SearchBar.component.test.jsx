import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useVideo } from '../../providers/Video';

import SearchBar from './SearchBar.component';

jest.mock('../../providers/Video', () => ({
  useVideo: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: jest.fn() }),
  useLocation: () => ({ location: { pathname: '/' } }),
}));

const useVideoMock = {
  searchTerm: 'test',
  setSearchTerm: jest.fn(),
  fetchVideos: jest.fn(),
};

describe('SearchBar.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SearchBar elements', () => {
    useVideo.mockReturnValue(useVideoMock);

    render(<SearchBar />);

    expect(screen.getByPlaceholderText('Search…')).toBeTruthy();
  });

  it('fetches videos on render', () => {
    useVideo.mockReturnValue(useVideoMock);

    render(<SearchBar />);

    expect(useVideoMock.fetchVideos).toHaveBeenCalledWith(useVideoMock.searchTerm);
  });

  it('updates search term when typing in the search input', () => {
    useVideo.mockReturnValue(useVideoMock);

    render(<SearchBar />);

    const inputSearch = screen.getByPlaceholderText('Search…');

    fireEvent.change(inputSearch, { target: { value: 'search-term' } });

    expect(useVideoMock.setSearchTerm).toHaveBeenCalledWith('search-term');
  });

  it('triggers search when pressing enter', () => {
    useVideo.mockReturnValue(useVideoMock);

    render(<SearchBar />);

    const inputSearch = screen.getByPlaceholderText('Search…');

    fireEvent.keyDown(inputSearch, { key: 'Enter' });

    expect(useVideoMock.fetchVideos).toHaveBeenCalledWith(useVideoMock.searchTerm);
  });
});
