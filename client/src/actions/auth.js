// get the api calls
import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    // try send data to the database/back-end
    try {
        // login the user
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data } );
        
        // navigate to the home page once the user logs in
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    // try send data to the database/back-end
    try {
        // sign up the user
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });

        // navigate to the home page once the user logs in
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

