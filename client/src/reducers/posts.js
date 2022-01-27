// Reducers are functions that take the current state and an action as arguments, 
// and return a new state result. In other words, (state, action) => newState.

import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

// default "posts=[]"
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            // new post is stored in action.payload
            // spread all the posts and add a new post
            return [ ...posts, action.payload];
        case UPDATE:
            // the output of any map method is an array
            // in this case, first mapping over the post array, then changing sth. in the array, finally returning the changed array
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}