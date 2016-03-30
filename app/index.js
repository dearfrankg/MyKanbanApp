import './main.css';

import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import DevTools from './components/DevTools';
import rootReducer from './dux'
import App from './components/App';


const createStoreWithMiddleware = compose(
  DevTools.instrument()
)(createStore);

const initialState = {}
const store = createStoreWithMiddleware(rootReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
