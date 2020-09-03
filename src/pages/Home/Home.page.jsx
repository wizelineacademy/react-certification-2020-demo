import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useVideo } from '../../providers/Video';
import VideoCardList from '../../components/VideoCards';
import TypographyTitle from './Home.styled';

const Home = () => {
  const { videos } = useVideo();
  const getVideoPath = (video) => `/${video.id}`;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TypographyTitle variant="h2">Welcome to the Challenge!</TypographyTitle>
      </Grid>
      <Grid item xs={12}>
        <VideoCardList videos={videos} getVideoPath={getVideoPath} />
      </Grid>
    </Grid>
  );
};

export default Home;
