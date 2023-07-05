import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getPost } from '../../../actions/posts'

import { fetchPost } from '../../../services/posts';

import useStyles from './styles';

const PostDetails = () => {
  
  //const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [post, setPostRes] = useState(null)
  const classes = useStyles();
  const { id } = useParams();


  useEffect(() => { 
    const getItemById = async () => { 
      try { 
        const response = await axios.get(`http://localhost:4000/api/posts/${id}`);
        const itemData = response.data; 
        setPostRes(itemData);
        console.log(itemData);
      } catch (error) 
      { 
        console.error(error);
      } }; 
      getItemById();
     }, [id]);



  if (!post) return null;


    return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
          <div className={classes.card}>
        <div className={classes.section}>
          <br/><br/><br/>
          <Typography variant="h3" component="h2">{post.title}</Typography><br/>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography><br/><br/>
          <Typography variant="h6">Created by: {post.creator}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>


      </Paper>
  )
}

export default PostDetails




/*const PostDetails = () => {
  return(
    <div>Worked</div>
  )

}


export default PostDetails*/