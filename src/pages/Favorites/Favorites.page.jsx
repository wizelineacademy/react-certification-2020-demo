import React from 'react';
import Alert from '@material-ui/lab/Alert';

import { useUserPreferences } from '../../providers/UserPreferences';
import VideoCards from '../../components/VideoCards';

const Favorites = () => {
  const { favoriteVideos } = useUserPreferences();

  const getVideoPath = (video) => `/favorites/${video.id}`;

  return favoriteVideos.length === 0 ? (
    <Alert severity="error" style={{ margin: 30 }}>
      You haven&apos;t added any video to your favorites yet
    </Alert>
  ) : (
    <VideoCards videos={favoriteVideos} getVideoPath={getVideoPath} />
  );
};

export default Favorites;
