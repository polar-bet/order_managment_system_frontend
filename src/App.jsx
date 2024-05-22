import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'
import UserAccount from './pages/UserAccount'
import NotFound from './pages/NotFound'
import AuthUser from './components/AuthUser'
import ControlPanelLayout from './components/ControlPanelLayout'
import DetectUserStatus from './components/DetectUserStatus'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useState } from 'react'

const ProtectedRoute = ({ element, redirectTo, ...rest }) => {
  const isAuthenticated = localStorage.getItem('accessToken')
  // const isAuthenticated = useSelector(state => state.auth.token)
  // const [isLoading, setLoading] = useState(true)

  // setTimeout(() => {
  //   setLoading(false)
  // }, 400)

  // if (!isLoading) {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate
      to={redirectTo}
      state={{ from: rest.location?.pathname || '/' }}
    />
  )
  // }
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
}

function App() {
  return (
    <>
      <AuthUser />
      {/* <DetectUserStatus /> */}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/user-account"
            element={
              <ProtectedRoute element={<UserAccount />} redirectTo={'/login'} />
            }
          />
          <Route
            path="/control-panel/*"
            element={
              <ProtectedRoute
                element={<ControlPanelLayout />}
                redirectTo={'/login'}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
