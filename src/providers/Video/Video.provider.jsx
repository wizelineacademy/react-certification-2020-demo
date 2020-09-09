import React, { useReducer, useEffect, createContext, useContext } from 'react';

import { storage } from '../../utils/storage';
import {
  fetchVideosAction,
  setSearchTermAction,
  setCurrentVideoAction,
} from './video.actions';
import { videoReducer, initialState } from './video.reducer';

const VideoContext = createContext(null);

function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

const videoStorageKey = 'REACT-CHALLENGE-VIDEO';

function lazyInit(state) {
  return {
    ...state,
    video: storage.get(videoStorageKey),
  };
}

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState, lazyInit);

  useEffect(() => {
    if (state.video) {
      storage.set(videoStorageKey, state.video);
    } else {
      storage.remove(videoStorageKey);
    }
  }, [state.video]);

  const value = {
    loading: state.loading,
    error: state.error,
    videos: state.videos,
    video: state.video,
    searchTerm: state.searchTerm,
    fetchVideos: fetchVideosAction(dispatch),
    setSearchTerm: setSearchTermAction(dispatch),
    setCurrentVideo: setCurrentVideoAction(dispatch),
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};

export { useVideo };
export default VideoProvider;
