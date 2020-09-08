import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../Card';
import { useVideo } from '../../providers/Video';
import VideoWrapper from './VideoCards.styled';

const VideoCardList = ({ videos, getVideoPath }) => {
  const { push } = useHistory();

  const { setCurrentVideo } = useVideo();

  function handleOnClick(video) {
    setCurrentVideo(video);
    push(getVideoPath(video));
  }

  return (
    <VideoWrapper>
      {videos.map((video) => (
        <Card
          key={video.id}
          img={video.image}
          title={video.title}
          description={video.description}
          publishTime={video.publishTime}
          onClick={() => handleOnClick(video)}
        />
      ))}
    </VideoWrapper>
  );
};

export default VideoCardList;
