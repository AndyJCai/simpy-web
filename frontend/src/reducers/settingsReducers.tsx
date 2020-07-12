import { CHANGE_COLOR } from '../actions/types';

const STARTING_STATE = {
  userColor: "#005073",
};

export default (state = STARTING_STATE, action) => {
  switch(action.type){
    case CHANGE_COLOR:
      return { ...state, userColor: action.userColor };
    default:
      return state;
  };
};
