import styled from 'styled-components';

const VideoWrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin: 0 auto;

  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  box-sizing: border-box;

  @media (min-width: 770px) {
    width: 770px;
    justify-content: flex-start;
  }
  @media (min-width: 1135px) {
    width: 1135px;
  }
  @media (min-width: 1135px) {
    width: 1135px;
  }
  @media (min-width: 1500px) {
    width: 1500px;
  }
  @media (min-width: 1865px) {
    width: 1865px;
  }
`;

export default VideoWrapper;
