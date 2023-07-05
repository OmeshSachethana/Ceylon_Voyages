import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks'
import Home from '../pages/home'
import NotFound from '../pages/404'
import Tours from '../pages/tours'
import Tour from '../pages/tour'
import PostDetails from '../components/Posts/PostDetails/PostDetails'

import Memo from '../pages/Memo'
import Items from '../pages/items'
import Item from '../pages/item'
import EditReview from '../pages/edit-review'
import SignUp from '../pages/auth/sign-up'
import ViewProfile from '../pages/viewProfile'
import EditProfile from '../pages/edit-profile'
import SearchProfile from '../pages/find-profile'
import SearchProfileResults from '../pages/profile-list'
import Login from '../pages/auth/sign-in'
import ViewPublicProfile from '../pages/view-public-profile'
import ProtectedRoutes from '../routes/ProtectedRoutes'

const AnimatedRoutes = () => {
  // useAuth()

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Navigate to="/tours" />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Route>
        <Route path="/view-public-profile/:id" element={<ViewPublicProfile />} />
        <Route path="/find-profile/" element={<SearchProfile />} />
        <Route path="/find-profile/:searchby/:keyword" element={<SearchProfileResults />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tour/:id" element={<Tour />} />
        <Route path="/items" element={<Items />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/review/:id" element={<EditReview />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/posts" element={<Memo />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
