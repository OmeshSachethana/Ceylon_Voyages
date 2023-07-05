import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../../actions/posts';

const Form = ({ currentId, setCurrentId, selectedPost }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const post = useSelector((state) => {
    //fetchPost(currentId,true)
    console.log('state changed ' + state);
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  // populate the values of the form
  useEffect(() => {
    if (selectedPost) {
      console.log('selected post found ' + selectedPost._id); //to check the posts
      setPostData(selectedPost);
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any mandatory fields are empty
    if (!postData.creator || !postData.title || !postData.message || !postData.tags) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${selectedPost.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" required fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" required fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (comma separated)" required fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-12 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline" type='button' onClick={clear}>
          Clear
        </button>
      </form>
    </Paper>
 

  )
}

export default Form
