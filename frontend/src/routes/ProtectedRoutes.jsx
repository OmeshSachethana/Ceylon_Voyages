import { Navigate, Outlet } from "react-router-dom"
import Login from "../pages/auth/sign-in"

const useAuth = () => {
    const accessToken = localStorage.getItem('accessToken')
    let loggedIn = false
    accessToken ? loggedIn = true : loggedIn

    return loggedIn
}
const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Navigate to='/sign-in' />
}

export default ProtectedRoutes
