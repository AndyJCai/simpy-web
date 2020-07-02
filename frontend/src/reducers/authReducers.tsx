import { SIGN_IN, SIGN_OUT } from '../actions/types';

const STARTING_STATE = {
  isSignedIn: null,
  userId: null
}

export default (state = STARTING_STATE, action) => {
  switch(action.type){
    case SIGN_IN:
      return { ...state, isSignedIn: false, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
}
