import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    // implement manual login registrat ion system using JSON web token

    // 2 types of submit: 1. Sign up 2. Sign in
    const handleSubmit = (e) => {
        e.preventDefault();

        // if the user is sign up, pass the form data and allows to navigate once something happens
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

     // toggling
     const handleShowPassword = () => setShowPassword(!showPassword);

    // spread the other data and only update a specific input: each input has its own name, which is the same as the one in the initialState.
    // use one function to change all the state fields
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // switch from sign up to sign in
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    // implement the Google OAuth Authentication
    const googleSuccess = async (res) => {
        //not throw an error if don't have access to the res object, and say undefined instead
        const result = res?.profileObj;
        const token = res?.tokenId;

        // once logged in, automatically jump to the home page
        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    
    const googleFailure = (error) => {
        console.log('Failed to Google Sign In. Please try again.');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                {/* whether the user is signed up */}
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { 
                            /* only if the user is signed up, show the following: */
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    {/* type="submit" means that it calls the onSubmit function, which is handleSubmit (in the code above) */}
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        clientId="93826081335-2sp86fcgthag6j52d2m9i402dlg5rcaj.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        // adding props for GoogleLogin
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Please sign in if you already have an account.' : "Sign Up to create a new account" }
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
