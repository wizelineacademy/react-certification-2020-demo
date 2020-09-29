import videosApi from '../../api/videos.api';
import {
  ACTIONS,
  fetchVideosAction,
  setSearchTermAction,
  setCurrentVideoAction,
  filterVideoData,
} from './video.actions';

jest.mock('../../api/videos.api', () => jest.fn());

const mockedVideos = [
  {
    id: { kind: 'youtube#video', videoId: '123' },
    snippet: { title: 'Title', description: 'Description' },
  },
];

const dispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchVideosAction', () => {
  it('handles successful fetch videos', async () => {
    videosApi.mockResolvedValue(mockedVideos);

    await fetchVideosAction(dispatch)('test');

    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: ACTIONS.FETCH_VIDEOS_SUCCESS,
        payload: { videos: mockedVideos.map(filterVideoData) },
      })
    );
  });

  it('handles login error', async () => {
    videosApi.mockRejectedValue(new Error('Fetch error'));

    await fetchVideosAction(dispatch)('test-wrong');

    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: ACTIONS.FETCH_VIDEOS_ERROR,
        payload: { error: 'Fetch error' },
      })
    );
  });
});

describe('setSearchTermAction', () => {
  it('triggers set search term action', async () => {
    await setSearchTermAction(dispatch)('test');

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTIONS.SET_SEARCH_TERM,
        payload: { searchTerm: 'test' },
      })
    );
  });
});

describe('setCurrentVideoAction', () => {
  it('triggers set current video action', async () => {
    await setCurrentVideoAction(dispatch)({});

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTIONS.SET_CURRENT_VIDEO,
        payload: { video: {} },
      })
    );
  });
});

// describe('setCurrentVideoAction', () => {
//   it('triggers inverse theme action', async () => {
//     await setCurrentVideoAction(dispatch)(mockedVideo);

//     expect(dispatch).toHaveBeenCalledWith(
//       expect.objectContaining({ type: ACTIONS.SET_INVERSE_THEME })
//     );
//   });
// });
