import { axiosInstance, apiRequest } from "./core/axios";

export const createBooking = async (data, showLoader) => {
  return await apiRequest(
    () => axiosInstance.post("/api/bookings/", data),
    showLoader
  );
};

export const getAllBookings = async (showLoader) => {
  return await apiRequest(
    () => axiosInstance.get("/api/bookings/"),
    showLoader
  );
};

export const getBooking = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/bookings/${id}`),
    showLoader
  );
};

export const updateBookingStatus = async (id, data, showLoader) => {
  return await apiRequest(
    () => axiosInstance.patch(`/api/bookings/status/${id}`, data),
    showLoader
  );
};

export const archiveBooking = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.patch(`/api/bookings/archive/${id}`),
    showLoader
  );
};

export const deleteBooking = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.delete(`/api/bookings/${id}`),
    showLoader
  );
};
