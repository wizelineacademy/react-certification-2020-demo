import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const DivContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const DivVideo = styled.div`
  width: 70%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const DivVideoDetails = styled.div`
  padding: 10px 30px;
  boxsizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const TypographyDescription = styled(Typography)`
  padding: 0px 30px;
  box-sizing: border-box;
`;
