import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    //const [ postData, setPostData ] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    const [ postData, setPostData ] = useState({title: '', message: '', tags: '', selectedFile: ''});

    // only find the specific post that has the same id as the current id
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    // use useEffect to populate the values of the form
    // define when the callback function should be ran: when the post value changes from null to the actual post
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    // once the user submit, send over a post request with all the data that user typed in
    // dispatch the action -> reducer -> case: CREATE -> spread all the posts + add the new post in './actions/posts.js' 
    const handleSubmit = (e) => {
        e.preventDefault();

        // if don't have a currently selected id, create new post
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            // pass all the data from the state
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own posts and connect with others.
            </Typography>
          </Paper>
        );
    }
    

    const clear = () => {
        setCurrentId(null);
        //setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''});
        setPostData({ title: '', message: '', tags: '', selectedFile: ''});
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId? 'Edit' : 'Share'} your thoughts</Typography>
                {/* store the value in the state; the whole data from the post is stored in postData object in the state,
                    and each object key is a specifc text filed.
                    
                    use onChange to change the value of the state field
                    use ...postData to keep the original data, and only change the specific property of that specific text field
                 */}
                {/*<TextField name="creator" varaint="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value})}/>
                */}
                <TextField name="title" varaint="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
                <TextField name="message" varaint="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
                <TextField name="tags" varaint="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase64 type="file" multple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>    
    );
}

 export default Form;