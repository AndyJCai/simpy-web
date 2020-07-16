import { SIGN_IN, SIGN_OUT, REFRESH_TOKEN, START_REFRESHING_TOKEN } from '../actions/types';
import { refreshToken } from '../actions';

const STARTING_STATE = {
  isSignedIn: null,
  userId: null,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  timeStamp: null,
  isRefreshing: false,
};

export default (state = STARTING_STATE, action) => {
  switch(action.type){
    case SIGN_IN:
      // update isSignedIn and userId
      return {
        ...state,
        timeStamp: action.timeStamp,
        expiresIn: action.expiresIn,
        isSignedIn: true,
        userId: action.userId,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    case SIGN_OUT:
      // update isSignedIn and userId
      return {
        ...state,
        timeStamp: null,
        expiresIn: null,
        isSignedIn: false,
        userId: null,
        accessToken: null,
        refreshToken: null
      };
    case START_REFRESHING_TOKEN:
      return {
        ...state,
        isRefreshing: true,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        timeStamp: action.timeStamp,
        expiresIn: action.expiresIn,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isRefreshing: false
      };
    default:
      return state;
  };
};
