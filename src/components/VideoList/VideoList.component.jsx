import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import { useVideo } from '../../providers/Video';
import {
  DivListVideo,
  DivListItem,
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
    <DivListVideo>
      {videos.map((video) => (
        <Fragment key={video.etag}>
          <DivListItem onClick={() => handleOnClick(video)}>
            <ImgVideo src={video.image} alt="image" />
            <VideoListDetails>
              <Typography>{video.title}</Typography>
            </VideoListDetails>
          </DivListItem>
          <Divider />
        </Fragment>
      ))}
    </DivListVideo>
  );
}

export { VideoList };
