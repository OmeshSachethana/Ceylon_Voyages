import { axiosInstance, axiosInstanceFile, apiRequest } from "./core/axios";

export const createTour = async (data, showLoader) => {
  return await apiRequest(
    () => axiosInstanceFile.post("/api/tours/", data),
    showLoader
  );
};

export const getAllTours = async (showLoader) => {
  return await apiRequest(() => axiosInstance.get("/api/tours/"), showLoader);
};

export const getTour = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/tours/${id}`),
    showLoader
  );
};

export const updateTour = async (id, data, showLoader) => {
  return await apiRequest(
    () => axiosInstance.patch(`/api/tours/${id}`, data),
    showLoader
  );
};

export const deleteTour = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.delete(`/api/tours/${id}`),
    showLoader
  );
};

export const searchTour = async (term, showLoader) => {
  return await apiRequest(
    () => axiosInstance.delete(`/api/tours/search/${term}`),
    showLoader
  );
};
