import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, Redirect } from 'react-router-dom';

import { useVideo } from '../../providers/Video';
import { useAuth } from '../../providers/Auth';
import { useUserPreferences } from '../../providers/UserPreferences';
import { VideoList } from '../../components/VideoList';
import {
  VideoWrapper,
  DivVideo,
  DivVideoDetails,
  TypographyDescription,
} from './Video.styled';

const getVideoPath = (location) => ({ id }) => {
  const route = location.pathname.includes('favorites') ? '/favorites/' : '/';
  return route + id;
};

function Video() {
  const { video, videos } = useVideo();
  const { isLoggedIn } = useAuth();
  const {
    favoriteVideos,
    isFavoriteVideo,
    addFavoriteVideo,
    removeFavoriteVideo,
  } = useUserPreferences();

  const { location } = useHistory();

  const videosList = location.pathname.includes('favorites') ? favoriteVideos : videos;

  if (!video) {
    return <Redirect to="/" />;
  }

  const { id, title, description } = video;

  function handleAddVideo() {
    addFavoriteVideo(video);
  }

  function handleRemoveVideo() {
    removeFavoriteVideo(video);
  }

  return (
    <VideoWrapper>
      <DivVideo>
        <iframe
          title="video"
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${id}`}
        />
        <DivVideoDetails>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {isLoggedIn &&
            (isFavoriteVideo(video) ? (
              <Button onClick={handleRemoveVideo}>Remover de favoritos</Button>
            ) : (
              <Button onClick={handleAddVideo}>Agregar a favoritos</Button>
            ))}
        </DivVideoDetails>
        <TypographyDescription variant="body2" color="textSecondary" component="p">
          {description}
        </TypographyDescription>
      </DivVideo>
      <VideoList videos={videosList} getVideoPath={getVideoPath(location)} />
    </VideoWrapper>
  );
}

export default Video;
