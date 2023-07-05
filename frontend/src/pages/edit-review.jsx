import { useState, useEffect } from 'react'
import { getReview, updateReview } from '../services/reviews'

import { TextField, Button } from '@mui/material';

function EditReview({ reviewId, onClose, refresh }) {
  const [text, setText] = useState('')
  const [rating, setRating] = useState('')

  useEffect(() => {
    // Fetch the review data and prefill the form with it
    getReview(reviewId)
      .then((response) => {
        setText(response.data.text)
        setRating(response.data.rating)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [reviewId])

  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedReview = {
      text: text,
      rating: rating,
    }

    updateReview(reviewId, updatedReview)
      .then((response) => {
        console.log(response.data)
        // Redirect the user to the tour page
        // Or show a success message
        refresh()
        onClose()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Text" variant="outlined" value={text} onChange={(event) => setText(event.target.value)} margin="normal" fullWidth />
      <TextField label="Rating" inputProps={{ min: '1', max: '5' }} variant="outlined" type="number" value={rating} onChange={(event) => setRating(event.target.value)} margin="normal" fullWidth />
      <Button variant="contained" type="submit" color="primary">
        Update Review
      </Button>
    </form>
  )
}

export default EditReview
