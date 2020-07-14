import { STORE_SPOTIFY_INFO } from '../actions/types';

const STARTING_STATE = {
  displayName: null,
  profilePic: [],
  friends: [],
  spotifyId: null,
  username: null,
};

export default (state = STARTING_STATE, action) => {
  switch(action.type){
    case STORE_SPOTIFY_INFO:
      return { ...state, displayName: action.displayName, profilePic: action.profilePic, friends: action.friends, spotifyId: action.spotifyId, username: action.username };
    default:
      return state;
  };
};
