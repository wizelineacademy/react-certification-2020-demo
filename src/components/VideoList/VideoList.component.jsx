import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import { useVideo } from '../../providers/Video';
import {
  ListVideoWrapper,
  ListVideoItem,
  ImgVideo,
  VideoListDetails,
} from './VideoList.styled';

function VideoList({ videos, getVideoPath }) {
  const { setCurrentVideo } = useVideo();
  const { push } = useHistory();

  function handleOnClick(video) {
    setCurrentVideo(video);
    push(getVideoPath(video));
  }

  return (
    <ListVideoWrapper>
      {videos.map((video) => (
        <Fragment key={video.id}>
          <ListVideoItem onClick={() => handleOnClick(video)}>
            <ImgVideo src={video.image} alt={video.title} />
            <VideoListDetails>
              <Typography>{video.title}</Typography>
            </VideoListDetails>
          </ListVideoItem>
          <Divider />
        </Fragment>
      ))}
    </ListVideoWrapper>
  );
}

export { VideoList };
