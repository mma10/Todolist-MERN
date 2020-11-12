import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'

import rootReducer from './store/reducers/rootReducer'

const initState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initState, composeWithDevTools(
  applyMiddleware(...middleware)
));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>    
        <App />    
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
