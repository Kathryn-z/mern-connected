import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

// action creators: functions that return action, and action is a object that has type and payload.
// to deal with asychronous logic, use redux-thunk to add async(dispatch) function and dispatch the function instead of returing it.
export const getPosts = () => async (dispatch) => {
    try {
        // get the response from the api and and get the data object in response
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) =>  {
    try {
        // destructure the data from the response
        // make a post api request to the backend server and send the post
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) =>  {
    try {
        // make api request to update the post
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) =>  {
    try {
        // make api request to delete the post
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) =>  {
    try {
        // get the data of the newly updated post
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}