import { axiosInstance, apiRequest, axiosInstanceFile } from "./core/axios";

export const createItem = async (data, showLoader) => {
  return await apiRequest(
    () => axiosInstanceFile.post("/api/items/", data),
    showLoader
  );
};

export const getAllItems = async (showLoader) => {
  return await apiRequest(() => axiosInstance.get("/api/items/"), showLoader);
};

export const getItem = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/items/${id}`),
    showLoader
  );
};

export const updateItem = async (id, data, showLoader) => {
  return await apiRequest(
    () => axiosInstance.patch(`/api/items/${id}`, data),
    showLoader
  );
};

export const deleteItem = async (id, showLoader) => {
  return await apiRequest(
    () => axiosInstance.delete(`/api/items/${id}`),
    showLoader
  );
};

export const searchItem = async (term, showLoader) => {
  return await apiRequest(
    () => axiosInstance.delete(`/api/items/search/${term}`),
    showLoader
  );
};
