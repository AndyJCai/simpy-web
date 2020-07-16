import { CHANGE_COLOR, CLEAR_SETTINGS } from '../actions/types';

const STARTING_STATE = {
  userColor: "#005073",
};

export default (state = STARTING_STATE, action) => {
  switch(action.type){
    case CHANGE_COLOR:
      return { ...state, userColor: action.userColor };
    case CLEAR_SETTINGS:
      return { ...state, userColor: "#005073" };
    default:
      return state;
  };
};
