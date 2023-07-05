import { axiosInstance, apiRequest } from './core/axios'

export const addNotifications = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/notification/`, data), showLoader)
}

export const getNotifications = async (showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/notification`), showLoader)
}

export const updateNotifications = async (id, data, showLoader) => {
  return await apiRequest(() => axiosInstance.patch(`/api/notification/${id}`, data), showLoader)
}