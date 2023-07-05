import { axiosInstance, apiRequest } from './core/axios'

export const getAllUsers = async (showLoader) => {
  // return await apiRequest(() => axiosInstance.get(`/api/items?page=${page}`), showLoader);
  return await apiRequest(() => axiosInstance.get('/api/users'), showLoader);
}

export const getUser = async (id, showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/users/${id}`), showLoader);
}

export const createUser = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post("/api/users", data), showLoader);
}

export const updateUser = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.patch("/api/users", data), showLoader);
}

export const deleteUser = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.delete(`/api/users/`, data), showLoader);
}
