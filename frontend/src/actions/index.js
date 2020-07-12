import {
  SIGN_IN,
  SIGN_OUT,
  GET_NEWSFEED,
  GET_NEWSCARD,
  DELETE_NEWSCARD,
  CHANGE_COLOR,
  STORE_SPOTIFY_INFO
} from './types';
import history from '../history';

export const signIn = (userId, accessToken, refreshToken) => {
  return {
    type: SIGN_IN,
    userId: userId,
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
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

export const storeSpotifyInfo = (displayName, profilePic, friends, spotifyId) => {
  return {
    type: STORE_SPOTIFY_INFO,
    displayName: displayName,
    profilePic: profilePic,
    friends: friends,
    spotifyId: spotifyId
  }
}
