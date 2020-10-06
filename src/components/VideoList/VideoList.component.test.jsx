import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useVideo } from '../../providers/Video';

import { VideoList } from './VideoList.component';

jest.mock('../../providers/Video', () => ({
  useVideo: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: jest.fn() }),
}));

const useVideoMock = {
  setCurrentVideo: jest.fn(),
};
const mockedProps = {
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
  getVideoPath: jest.fn(),
};

describe('VideoList.component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders video items', () => {
    useVideo.mockReturnValue(useVideoMock);

    render(<VideoList {...mockedProps} />);

    expect(screen.getAllByRole('button').length).toBe(mockedProps.videos.length);
  });

  it('handles click on video', () => {
    useVideo.mockReturnValue(useVideoMock);

    render(<VideoList {...mockedProps} />);

    const videoCards = screen.getAllByRole('button');

    fireEvent.click(videoCards[0]);

    expect(useVideoMock.setCurrentVideo).toHaveBeenCalledWith(mockedProps.videos[0]);
    expect(mockedProps.getVideoPath).toHaveBeenCalledWith(mockedProps.videos[0]);
  });
});
