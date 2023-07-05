import { axiosInstance, apiRequest } from './core/axios';

// Create a new post
export const createPost = async (newPost, showLoader) => {
  return await apiRequest(() => axiosInstance.post('/api/posts/', newPost), showLoader);
};

// Fetch all posts
export const fetchPosts = async (page, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/posts?page=${page}`), showLoader);
};

// Fetch a single post
export const fetchPost = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/posts/${id}`), showLoader);
};

// Update a post
export const updatePost = async (id, updatedPost, showLoader) => {
  return await apiRequest(() => axiosInstance.patch(`/api/posts/${id}`, updatedPost), showLoader);
};

// Delete a post
export const deletePost = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.delete(`/api/posts/${id}`), showLoader);
};

// Fetch posts by search query
export const fetchPostsBySearch = async (searchQuery, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/posts/search?searchQuery=${searchQuery || 'none'}`), showLoader);
};

// Search for posts by term
export const searchPost = async (term, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/posts/search/${term}`), showLoader);
};
