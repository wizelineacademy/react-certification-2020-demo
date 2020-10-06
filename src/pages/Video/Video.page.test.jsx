import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Redirect } from 'react-router-dom';

import { useVideo } from '../../providers/Video';
import { useAuth } from '../../providers/Auth';
import { useUserPreferences } from '../../providers/UserPreferences';

import Video from './Video.page';

jest.mock('../../providers/Video', () => ({
  useVideo: jest.fn(),
}));
jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../../providers/UserPreferences', () => ({
  useUserPreferences: jest.fn(),
}));
jest.mock('../../components/VideoList', () => ({
  VideoList: ({ videos }) =>
    videos.map((video) => <div key={video.id}>VideoCard Mock</div>),
}));
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({
    location: { pathname: 'video' },
  })),
  Redirect: jest.fn(() => null),
}));

const mockedUseVideo = {
  videos: [
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
  video: {
    id: 123,
    publishTime: Date.now(),
    title: 'Title 1',
    description: 'Description 1',
    img: 'image1.jpg',
  },
};
const mockedUseAuth = {
  isLoggedIn: false,
};
const mockedUseUserPreferences = {
  favoriteVideos: [
    {
      id: 890,
      publishTime: Date.now(),
      title: 'Favorite Title 1',
      description: 'Favorite Description 1',
      img: 'favorite-image1.jpg',
    },
  ],
  isFavoriteVideo: jest.fn(),
  addFavoriteVideo: jest.fn(),
  removeFavoriteVideo: jest.fn(),
};

describe('Video.page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useVideo.mockReturnValue(mockedUseVideo);
    useAuth.mockReturnValue(mockedUseAuth);
    useUserPreferences.mockReturnValue(mockedUseUserPreferences);
  });

  it('renders the video elements', () => {
    render(<Video />);

    expect(
      screen.getByRole('heading', { name: mockedUseVideo.video.title })
    ).toBeTruthy();
    expect(screen.getByText(mockedUseVideo.video.description)).toBeTruthy();
  });

  it('renders the list of related videos', () => {
    render(<Video />);

    expect(screen.getAllByText('VideoCard Mock').length).toBe(2);
  });

  it('redirects to home in case there is no video to display', () => {
    useVideo.mockReturnValue({ ...mockedUseVideo, video: null });

    render(<Video />);

    expect(Redirect).toHaveBeenCalledWith(expect.objectContaining({ to: '/' }), {});
  });

  it('does not display the add/remove from favorites button if user is not logged in', () => {
    render(<Video />);

    expect(screen.queryByRole('button')).toBeFalsy();
  });

  describe('Favorite video action', () => {
    beforeEach(() => {
      useAuth.mockReturnValue({ ...mockedUseVideo, isLoggedIn: true });
    });

    it('triggers action for adding video to favorites', () => {
      mockedUseUserPreferences.isFavoriteVideo.mockReturnValue(false);

      render(<Video />);

      const favoriteButton = screen.getByRole('button', { name: 'Add to favorites' });

      fireEvent.click(favoriteButton);

      expect(mockedUseUserPreferences.addFavoriteVideo).toHaveBeenCalledWith(
        mockedUseVideo.video
      );
    });

    it('triggers action for removing video to favorites', () => {
      useAuth.mockReturnValue({ ...mockedUseVideo, isLoggedIn: true });

      mockedUseUserPreferences.isFavoriteVideo.mockReturnValue(true);

      render(<Video />);

      const favoriteButton = screen.getByRole('button', {
        name: 'Remove from favorites',
      });

      fireEvent.click(favoriteButton);

      expect(mockedUseUserPreferences.removeFavoriteVideo).toHaveBeenCalledWith(
        mockedUseVideo.video
      );
    });
  });
});
