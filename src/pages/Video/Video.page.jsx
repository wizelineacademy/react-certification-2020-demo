import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

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

const Video = () => {
  const { video, videos } = useVideo();
  const { isLoggedIn } = useAuth();
  const {
    favoriteVideos,
    isFavoriteVideo,
    addFavoriteVideo,
    removeFavoriteVideo,
  } = useUserPreferences();

  const { replace, location } = useHistory();

  const videosList = location.pathname.includes('favorites') ? favoriteVideos : videos;
  const getVideoPath = ({ id }) => {
    if (location.pathname.includes('favorites')) {
      return `/favorites/${id}`;
    }
    return `/${id}`;
  };

  if (!video) {
    replace('/');
    return null;
  }

  const { id, title, description } = video;

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
              <Button onClick={() => removeFavoriteVideo(video)}>
                Remover de favoritos
              </Button>
            ) : (
              <Button onClick={() => addFavoriteVideo(video)}>Agregar a favoritos</Button>
            ))}
        </DivVideoDetails>
        <TypographyDescription variant="body2" color="textSecondary" component="p">
          {description}
        </TypographyDescription>
      </DivVideo>
      <VideoList videos={videosList} getVideoPath={getVideoPath} />
    </VideoWrapper>
  );
};

export default Video;
