import { axiosInstance, apiRequest } from './core/axios'

export const getAllReviews = async (showLoader) => {
  // return await apiRequest(() => axiosInstance.get(`/api/items?page=${page}`), showLoader);
  return await apiRequest(() => axiosInstance.get('/api/reviews'), showLoader);
}

export const getReview = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/reviews/${id}`), showLoader);
}

export const createReview = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post("/api/reviews", data), showLoader);
}

export const updateReview = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.patch("/api/reviews", data), showLoader);
}

export const deleteReview = async (id, userId, showLoader) => {
  return await apiRequest(() => axiosInstance.delete(`/api/review/${id}`, {data:{user_id: userId}}), showLoader);
}
