import { combineReducers } from "redux";
import authReducer from './authReducers';
import newsFeedReducer from './newsFeedReducers';

export default combineReducers({
  auth: authReducer,
  newsFeed: newsFeedReducer
});
