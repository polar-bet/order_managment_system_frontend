import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'
import UserAccount from './pages/UserAccount'
import NotFound from './pages/NotFound'
import AuthUser from './components/AuthUser'
import DetectUserStatus from './components/DetectUserStatus'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ControlPanelLayout from './layouts/ControlPanelLayout'
import GuestRoute from './components/ProtectedRoutes/GuestRoute'
import AuthRoute from './components/ProtectedRoutes/AuthRoute'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const user = useSelector(state => state.auth.token)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <>
      <AuthUser />
      <ScrollToTop />
      {/* {user && <DetectUserStatus />} */}
      {!isLoading && (
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="/about-us" element={<AboutUs />} />
              <Route element={<AuthRoute />}>
                <Route path="/user-account" element={<UserAccount />} />
                <Route
                  path="/control-panel/*"
                  element={<ControlPanelLayout />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}
      <Footer />
    </>
  )
}

export default App
