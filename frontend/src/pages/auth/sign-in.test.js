import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import Login from './sign-in'

jest.mock('axios')

describe('Login', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the login form', () => {
    // const { getByPlaceholderText, getByText } = render(<Login />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Login')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('submits the form with username and password', async () => {
    // const { getByPlaceholderText, getByText } = render(<Login />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Login')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })

    axios.post.mockResolvedValueOnce({
      data: {
        accessToken: 'testtoken',
      },
    })

    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/auth', {
        username: 'testuser',
        password: 'testpassword',
      })
      expect(localStorage.getItem('accessToken')).toEqual('testtoken')
      expect(window.alert).toHaveBeenCalledWith('Login successful')
      expect(window.location.pathname).toEqual('/')
    })
  })

  it('shows an error message when login fails', async () => {
    // const { getByPlaceholderText, getByText } = render(<Login />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Login')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })

    axios.post.mockRejectedValueOnce(new Error('Login failed'))

    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/auth', {
        username: 'testuser',
        password: 'testpassword',
      })
      expect(localStorage.getItem('accessToken')).toBeNull()
      expect(window.alert).toHaveBeenCalledWith('Please check your username and password')
      expect(window.location.pathname).toEqual('/login')
    })
  })
})
