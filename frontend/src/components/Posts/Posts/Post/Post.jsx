import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = () => {
    dispatch(likePost(post._id))
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id))
  }

  const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay} onClick={openPost}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <Typography className={classes.title} variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <button className="text-blue-500 hover:text-blue-700" onClick={handleLike}>
          <ThumbUpAltIcon className="text-sm" />
          &nbsp;Like&nbsp;
          {post.likeCount}
        </button>
        <button className="text-blue-500 hover:text-blue-700" onClick={handleDelete}>
          <DeleteIcon className="text-sm" />
          Delete
        </button>
      </CardActions>
    </Card>
  )
}

export default Post
