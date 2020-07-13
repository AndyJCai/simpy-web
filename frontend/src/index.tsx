import React from 'react';
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import { loadState, saveState } from './reducers/localStorage';
import App from "./App";
import throttle from 'lodash/throttle';


const peristedState = loadState();

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(reducers, peristedState,  composeEnhancers(applyMiddleware(reduxThunk)));

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
