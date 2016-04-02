import './main.css';

import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import DevTools from './components/DevTools';
import rootReducer from './dux'
import App from './components/App';
import storage from './lib/storage'


const createStoreWithMiddleware = compose(
  DevTools.instrument()
)(createStore);

const APP_STORAGE = 'my_kanban_app'
const initialState = storage.get(APP_STORAGE) || {}
const store = createStoreWithMiddleware(rootReducer, initialState)
store.subscribe(() => storage.set(APP_STORAGE, store.getState()))




ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
