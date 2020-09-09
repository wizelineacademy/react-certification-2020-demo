import React from 'react';
import Alert from '@material-ui/lab/Alert';

import { useUserPreferences } from '../../providers/UserPreferences';
import VideoCards from '../../components/VideoCards';

const ALERT_STYLES = { margin: 30 };

function Favorites() {
  const { favoriteVideos } = useUserPreferences();

  const getVideoPath = (video) => `/favorites/${video.id}`;

  return favoriteVideos.length === 0 ? (
    <Alert severity="error" style={ALERT_STYLES}>
      You haven&apos;t added any video to your favorites yet
    </Alert>
  ) : (
    <VideoCards videos={favoriteVideos} getVideoPath={getVideoPath} />
  );
}

export default Favorites;
