//https://redux.js.org/api/combinereducers
// combineReducers: helper function turns an object whose values are different reducing functions 
// into a single reducing function you can pass to createStore
import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

export default combineReducers({ posts, auth });