import React from 'react'
import ReactDOM from 'react-dom'
import "regenerator-runtime/runtime"
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import pokemons from './reducer/pokemons'
import types from './reducer/types'
import prograss_bar from './reducer/prograss_bar'
import pagination from './reducer/pagination'
import App from './components/App'
import { watchAsync } from './middleware'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ pokemons, types, prograss_bar, pagination }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchAsync)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);