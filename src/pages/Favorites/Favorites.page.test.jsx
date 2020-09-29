import React from 'react';
import { render, screen } from '@testing-library/react';

import { useUserPreferences } from '../../providers/UserPreferences';

import Favorites from './Favorites.page';

jest.mock('../../providers/UserPreferences', () => ({
  useUserPreferences: jest.fn(),
}));
jest.mock('../../components/VideoCards', () => ({ videos }) =>
  videos.map((video) => <div key={video.id}>VideoCard Mock</div>)
);

const mockedUserPreferences = {
  favoriteVideos: [
    {
      id: 123,
      publishTime: Date.now(),
      title: 'Title 1',
      description: 'Description 1',
      img: 'image1.jpg',
    },
    {
      id: 456,
      publishTime: Date.now(),
      title: 'Title 2',
      description: 'Description 2',
      img: 'image2.jpg',
    },
  ],
};

describe('Favorites.page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the video elements', () => {
    useUserPreferences.mockReturnValue(mockedUserPreferences);

    render(<Favorites />);

    expect(screen.getAllByText('VideoCard Mock').length).toBe(
      mockedUserPreferences.favoriteVideos.length
    );
  });

  it('displays an alert message in case there are no favorite videos', () => {
    useUserPreferences.mockReturnValue({ ...mockedUserPreferences, favoriteVideos: [] });

    render(<Favorites />);

    expect(screen.queryAllByText('VideoCard Mock').length).toBe(0);
    expect(screen.getByRole('alert')).toBeTruthy();
  });
});
