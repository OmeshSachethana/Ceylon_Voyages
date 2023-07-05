import { toast } from 'react-toastify'

const toastOptions = {
  autoClose: 2000,
}

const defaultErrorMessage = 'Something went wrong. Please try again later'

const success = (message) => {
  toast.success(message, toastOptions)
}

const error = (message) => {
  toast.error(message, toastOptions)
}

const warn = (message) => {
  toast.warn(message, toastOptions)
}

// Isolate error message from API response and pass it to the toast
const convertAndNotifyError = (e) => {
  let errorMessage = defaultErrorMessage
  if (e.response.data.message) errorMessage = e.response.data.message
  error(errorMessage)
}

const customToast = {
  success,
  error,
  warn,
  convertAndNotifyError,
}

export default customToast
