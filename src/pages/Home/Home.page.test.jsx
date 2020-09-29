import React from 'react';
import { render, screen } from '@testing-library/react';

import { useVideo } from '../../providers/Video';

import Home from './Home.page';

jest.mock('../../providers/Video', () => ({
  useVideo: jest.fn(),
}));
jest.mock('../../components/VideoCards', () => ({ videos }) =>
  videos.map((video) => <div key={video.id}>VideoCard Mock</div>)
);

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
};

describe('Home.page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the video elements', () => {
    useVideo.mockReturnValue(mockedUseVideo);

    render(<Home />);

    expect(screen.getAllByText('VideoCard Mock').length).toBe(
      mockedUseVideo.videos.length
    );
  });

  it('displays an alert message in case there are no videos', () => {
    useVideo.mockReturnValue({ ...mockedUseVideo, videos: [] });

    render(<Home />);

    expect(screen.queryAllByText('VideoCard Mock').length).toBe(0);
    expect(screen.getByRole('alert')).toBeTruthy();
  });
});
