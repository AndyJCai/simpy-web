import {
  SIGN_IN,
  SIGN_OUT,
  GET_NEWSFEED,
  GET_NEWSCARD,
  DELETE_NEWSCARD,
  CHANGE_COLOR,
  STORE_SPOTIFY_INFO,
  CLEAR_SETTINGS,
  CLEAR_SPOTIFY_INFO,
  REFRESH_TOKEN,
  START_REFRESHING_TOKEN
} from './types';
import history from '../history';

export const signIn = (userId, accessToken, refreshToken, expiresIn, timeStamp) => {
  return {
    type: SIGN_IN,
    userId: userId,
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: expiresIn,
    timeStamp: timeStamp,
  }
}

export const signOut = () => {
  history.push('/');
  return {
    type: SIGN_OUT
  }
}

export const refreshToken = (refreshToken) => async (dispatch) => {
  // add api call to refresh
  dispatch ({
    type: REFRESH_TOKEN,
    accessToken: accessToken,
    refreshToken: refreshToken
  });
}

export const startRefreshingToken = () => {
  return {
    type: START_REFRESHING_TOKEN
  }
}

export const getNewsFeed = (userId) => async (dispatch) => {
    // const response = await

    dispatch({ type: GET_NEWSFEED, payload: "hi" });
};

export const getNewsCard = (cardId) => async (dispatch) => {
    // const response = await

    dispatch({ type: GET_NEWSCARD, payload: "hi" });
};

export const deleteNewsCard = (cardId) => async (dispatch) => {
  dispatch({ type: DELETE_NEWSCARD, payload: cardId });
}

export const changeColor = (userColor) => {
  return {
    type: CHANGE_COLOR,
    userColor: userColor
  }
}

export const clearSettings = () => {
  return {
    type: CLEAR_SETTINGS
  }
}

export const storeSpotifyInfo = (displayName, profilePic, friends, spotifyId, username) => {
  return {
    type: STORE_SPOTIFY_INFO,
    displayName: displayName,
    profilePic: profilePic,
    friends: friends,
    spotifyId: spotifyId,
    username: username
  }
}

export const clearSpotifyInfo = () => {
  return {
    type: CLEAR_SPOTIFY_INFO
  }
}
