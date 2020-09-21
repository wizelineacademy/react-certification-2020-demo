import styled from 'styled-components';

const DivListVideo = styled.div`
  width: 30%;
  height: 100%;
  overflow: scroll;
`;

const DivListItem = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;

  & :hover {
    cursor: pointer;
  }
`;

const ImgVideo = styled.img`
  width: 120px;
  height: 90px;
`;

const VideoListDetails = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 5px;
  box-sizing: border-box;
`;

export { DivListVideo, DivListItem, ImgVideo, VideoListDetails };
