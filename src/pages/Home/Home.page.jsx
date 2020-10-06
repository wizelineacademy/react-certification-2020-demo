import React from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import { useVideo } from '../../providers/Video';
import VideoCards from '../../components/VideoCards';
import { TypographyTitle } from './Home.styled';

const ALERT_STYLES = { margin: 30 };

const Home = () => {
  const { videos } = useVideo();
  const getVideoPath = (video) => `/${video.id}`;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TypographyTitle variant="h2">Welcome to the Challenge!</TypographyTitle>
      </Grid>
      <Grid item xs={12}>
        {videos.length === 0 ? (
          <Alert severity="error" style={ALERT_STYLES}>
            No results were found
          </Alert>
        ) : (
          <VideoCards videos={videos} getVideoPath={getVideoPath} />
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
