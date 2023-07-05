import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const blacklistedPaths = ['', 'question', 'profile', 'change-password', 'leaderboard']

const useAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (!localStorage.getItem('token') && blacklistedPaths.includes(window.location.pathname.split('/')[1])) {
      navigate('/login')
    }
  }, [location])
}

export default useAuth
