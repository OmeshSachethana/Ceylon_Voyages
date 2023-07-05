import axios from 'axios'
import { toast } from 'react-toastify'
import store from '../../store'
import { toggleLoader } from '../../store/ui'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiRequest = async (request, showLoader = true, authRequired = true) => {
  store.dispatch(toggleLoader(showLoader))

  if (authRequired) {
    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
      return config
    })
  }

  const response = await request()
    .then((res) => ({
      ...res.data,
      success: true,
    }))
    .catch((error) => {
      const message = error

      store.dispatch(toggleLoader(false))
      toast.error(message)

      return null
    })
  store.dispatch(toggleLoader(false))
  return response
}
