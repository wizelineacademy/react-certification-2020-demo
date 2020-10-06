import he from 'he';
import videosApi from '../../api/videos.api';

const ACTIONS = {
  FETCH_VIDEOS: 'FETCH_VIDEOS',
  FETCH_VIDEOS_SUCCESS: 'FETCH_VIDEOS_SUCCESS',
  FETCH_VIDEOS_ERROR: 'FETCH_VIDEOS_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_CURRENT_VIDEO: 'SET_CURRENT_VIDEO',
};

function filterVideoData(videoData) {
  const { snippet, id } = videoData;

  const decodedVideoTitle = snippet.title ? he.decode(snippet.title) : '';
  const decodedVideoDescription = snippet.description
    ? he.decode(snippet.description)
    : '';

  return {
    id: id.videoId,
    image: snippet?.thumbnails?.medium?.url || '',
    title: decodedVideoTitle,
    description: decodedVideoDescription,
    publishTime: snippet?.publishTime,
  };
}

const fetchVideosAction = (dispatch) => async (searchTerm) => {
  dispatch({ type: ACTIONS.FETCH_VIDEOS });

  try {
    const results = await videosApi(searchTerm);
    const videos = results
      .filter((video) => video.id.kind === 'youtube#video')
      .map(filterVideoData);

    dispatch({
      type: ACTIONS.FETCH_VIDEOS_SUCCESS,
      payload: { videos },
    });
    return videos;
  } catch (error) {
    dispatch({
      type: ACTIONS.FETCH_VIDEOS_ERROR,
      payload: { error: error.message },
    });
    return null;
  }
};

const setSearchTermAction = (dispatch) => (searchTerm) =>
  dispatch({
    type: ACTIONS.SET_SEARCH_TERM,
    payload: { searchTerm },
  });

const setCurrentVideoAction = (dispatch) => (video) =>
  dispatch({
    type: ACTIONS.SET_CURRENT_VIDEO,
    payload: { video },
  });

export {
  ACTIONS,
  fetchVideosAction,
  setSearchTermAction,
  setCurrentVideoAction,
  filterVideoData,
};
