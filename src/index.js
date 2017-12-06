import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { logger } from 'redux-logger'

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';

import reducers from './reducers'

import { App } from './containers'
import registerServiceWorker from './registerServiceWorker'

require('dotenv').config()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const client = axios.create({
  baseURL: process.env.REACT_APP_TRADES_API,
  responseType: 'json'
})
let middlewares = composeEnhancers(
  applyMiddleware(axiosMiddleware(client))
)

if (process.env.NODE_ENV === 'development') {
  middlewares = composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(axiosMiddleware(client))
  )
}

const store = createStore(
  reducers,
  middlewares
)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
