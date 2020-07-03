import { SIGN_IN, SIGN_OUT } from '../actions/types';

const STARTING_STATE = {
  isSignedIn: null,
  userId: null
}

export default (state = STARTING_STATE, action) => {
  switch(action.type){
    case SIGN_IN:
      // update isSignedIn and userId
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      // update isSignedIn and userId
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
}
