import { combineReducers } from "redux";
import authReducer from './authReducers';
import newsFeedReducer from './newsFeedReducers';
import settingsReducer from './settingsReducers';

export default combineReducers({
  auth: authReducer,
  newsFeed: newsFeedReducer,
  settings: settingsReducer
});
