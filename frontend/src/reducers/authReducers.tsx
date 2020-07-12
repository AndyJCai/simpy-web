import { SIGN_IN, SIGN_OUT } from '../actions/types';

const STARTING_STATE = {
  isSignedIn: null,
  userId: null,
  accessToken: null,
  refreshToken: null
};

export default (state = STARTING_STATE, action) => {
  switch(action.type){
    case SIGN_IN:
      // update isSignedIn and userId
      return { ...state, isSignedIn: true, userId: action.userId, accessToken: action.accessToken, refreshToken: action.refreshToken };
    case SIGN_OUT:
      // update isSignedIn and userId
      return { ...state, isSignedIn: false, userId: null, accessToken: null, refreshToken: null};
    default:
      return state;
  };
};
