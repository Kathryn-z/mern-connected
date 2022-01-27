import React from 'react';
import ReactDOM from 'react-dom';

//Redux is an open-source JavaScript library for managing and centralizing application state. 
//It serves as a centralized store for state that needs to be used across your entire application, 
//with rules ensuring that the state can only be updated in a predictable fashion.

//React-Redux is our official package that lets your React components interact with a Redux store 
//by reading pieces of state and dispatching actions to update the store。
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));