import {
  ACTIONS,
  addFavoriteVideoAction,
  removeFavoriteVideoAction,
  setInverseThemeAction,
} from './userPreferences.actions';

jest.mock('../../api/login.api', () => jest.fn());

const mockedVideo = {
  id: '123',
};

const dispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('addFavoriteVideoAction', () => {
  it('triggers add to favorite action', async () => {
    await addFavoriteVideoAction(dispatch)(mockedVideo);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTIONS.ADD_FAVORITE_VIDEO,
        payload: { video: mockedVideo },
      })
    );
  });
});

describe('removeFavoriteVideoAction', () => {
  it('triggers remove from favorite action', async () => {
    await removeFavoriteVideoAction(dispatch)(mockedVideo);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTIONS.REMOVE_FAVORITE_VIDEO,
        payload: { video: mockedVideo },
      })
    );
  });
});

describe('setInverseThemeAction', () => {
  it('triggers inverse theme action', async () => {
    await setInverseThemeAction(dispatch)(mockedVideo);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: ACTIONS.SET_INVERSE_THEME })
    );
  });
});
