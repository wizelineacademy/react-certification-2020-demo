import styled from 'styled-components';

export const DivListVideo = styled.div`
  width: 30%;
  height: 100%;
  overflow: scroll;
`;

export const DivListItem = styled.div`
  widht: 100%;
  height: 100px;
  position: relative;
  display: flex;
  alignitems: center;

  & :hover {
    cursor: pointer;
  }
`;

export const ImgVideo = styled.img`
  width: 120px;
  height: 90px;
`;

export const VideoListDetails = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 5px;
  box-sizing: border-box;
`;
