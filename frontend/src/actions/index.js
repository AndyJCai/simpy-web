import { SIGN_IN, SIGN_OUT, GET_NEWSFEED, GET_NEWSCARD, DELETE_NEWSCARD } from './types';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    userId: userId
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
