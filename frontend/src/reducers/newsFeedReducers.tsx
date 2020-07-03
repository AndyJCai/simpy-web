import  { GET_NEWSFEED, GET_NEWSCARD, DELETE_NEWSCARD } from '../actions';
import _ from 'lodash';

export default (state={}, action){
  switch(action.type){
    case GET_NEWSFEED:
      // map each news feed returned to the id
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case GET_NEWSCARD:
      // get a single news feed and add it to state
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_NEWSCARD:
      return { _.omit(state, action.payload )};
    default:
      return state;
  }
};
