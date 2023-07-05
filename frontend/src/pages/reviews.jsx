import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { getAllReviews, getReviewByRating, createReview, deleteReview } from '../services/reviews'
import Moment from 'moment'
import EditReview from './edit-review'
import { NIL } from 'uuid'

//mui
import { Rating, TextField } from '@mui/material'

const Reviews = ({ id, onReviewsData, source }) => {
  const [reviews, setReviews] = useState([])
  const [selectedReviewId, setSelectedReviewId] = useState(null)
  const [rating, setRating] = useState(null)

  // Set the appropriate id based on the source prop
  const itemId = source === 'item' ? id : null
  const tourId = source === 'tour' ? id : null

  // Filter the reviews array based on the item id or tour id
  const filteredReviews = reviews.filter((review) => (review.item && review.item._id === id) || (review.tour && review.tour._id === id))

  const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0)
  const averageRating = totalRating / filteredReviews.length
  const numRatings = filteredReviews.length

  const handleRatingChange = async (event) => {
    setRating(event.target.value)
  }

  const handleEditReview = (reviewId) => {
    setSelectedReviewId(reviewId)
  }

  const handleCloseEditReview = () => {
    setSelectedReviewId(null)
  }

  const [reviewData, setReviewData] = useState({
    item: itemId,
    tour: tourId,
    user_id: 'admin',
    user: 'admin',
    text: '',
    rating: NIL,
  })

  const deleteReviews = async (id) => {
    try {
      await deleteReview(id)
      refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Send a POST request to the server to add the new review
    createReview(reviewData)
    refresh().catch((error) => {
      console.log(error)
    })
  }

  const refresh = debounce(() => {
    if (rating) {
      getReviewByRating(rating).then(({ data }) => setReviews(data))
    } else {
      getAllReviews().then(({ data }) => setReviews(data))
    }
  }, 300)

  useEffect(() => {
    onReviewsData(numRatings, averageRating)
    refresh()
  }, [numRatings, averageRating, rating])

  return (
    <div>
      <br />
      <div>
        <h4 className="text-2xl font-bold my-4">Reviews</h4>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="rating">
            Select a rating:
          </label>
          <div
            class="relative
            inline-block
            w-40
"
          >
            <select id="rating" value={rating} onChange={handleRatingChange} class="block appearance-none w-40 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="">All reviews</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
            {/* <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.95 6.95a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L15.586 11H3a1 1 0 010-2h12.586l-1.646-1.646a1 1 0 010-1.414z" />
              </svg>
            </div> */}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold">Add a Review</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block font-medium">Review Text:</label>
              <TextField multiline rows={4} variant="outlined" className="w-full mt-2" value={reviewData.text} onChange={(event) => setReviewData({ ...reviewData, text: event.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Rating:</label>
              <TextField type="number" inputProps={{ min: '1', max: '5' }} variant="outlined" className="w-full mt-2" value={reviewData.rating} onChange={(event) => setReviewData({ ...reviewData, rating: event.target.value })} />
            </div>
            <button type="submit" className="flex  text-white bg-primary border-0 py-2 px-6 justify-center w-full md:justify-start md:w-40 focus:outline-none hover:bg-secondary rounded">
              Submit Review
            </button>
          </form>
        </div>

        <br />
        {selectedReviewId !== null && <EditReview reviewId={selectedReviewId} onClose={handleCloseEditReview} refresh={refresh} />}
        {filteredReviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          filteredReviews
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((review) => (
              <div className="bg-white rounded-lg shadow-md mb-5" key={review._id}>
                <div className="p-4">
                  <p className="text-lg font-medium leading-tight mb-2 break-words">{review.text}</p>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    <span className="font-bold">User:</span> {review.user}
                    <br />
                    <span className="font-bold">Date:</span> {Moment(review.date).format('LLLL')}
                  </p>
                  <div className="flex items-center">
                    <Rating name="read-only" value={review.rating} size="small" readOnly />
                  </div>
                </div>
                {/* {props.user && props.user.id === review.user_id && ( */}
                <div className="bg-gray-100 px-4 py-2 flex justify-between">
                  <button onClick={() => handleEditReview(review._id)}>Edit</button>
                  <button className="text-red-500 font-medium hover:text-red-800" onClick={() => deleteReviews(review._id)}>
                    Delete Review
                  </button>
                </div>
                {/* )} */}
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default Reviews
