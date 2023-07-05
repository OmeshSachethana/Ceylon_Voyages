import { axiosInstance, apiRequest } from './core/axios'

export const getAllReviews = async (showLoader) => {
  // return await apiRequest(() => axiosInstance.get(`/api/items?page=${page}`), showLoader);
  return await apiRequest(() => axiosInstance.get('/api/reviews'), false)
}

export const getReview = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/reviews/${id}`), false)
}

export const createReview = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post('/api/reviews', data), showLoader)
}

export const updateReview = async (id, data, showLoader) => {
  return await apiRequest(() => axiosInstance.patch(`/api/reviews/${id}`, data), showLoader)
}

export const deleteReview = async (id, userId, showLoader) => {
  return await apiRequest(() => axiosInstance.delete(`/api/reviews/${id}`, { data: { user_id: userId } }), showLoader)
}

export const getReviewByRating = async (rating, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/reviews/rating/${rating}`), showLoader)
}
