import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const DivVideo = styled.div`
  width: 70%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const DivVideoDetails = styled.div`
  padding: 10px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const TypographyDescription = styled(Typography)`
  padding: 0px 30px;
  box-sizing: border-box;
`;

export { VideoWrapper, DivVideo, DivVideoDetails, TypographyDescription };
