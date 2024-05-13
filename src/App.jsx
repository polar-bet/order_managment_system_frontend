import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'
import UserAccount from './pages/UserAccount'
import NotFound from './pages/NotFound'
import ProductTable from './pages/ProductTable'
import OrderTable from './pages/OrderTable'
import Dashboard from './pages/Dashboard'
import AuthUser from './components/AuthUser'

function App() {
  return (
    <>
      <Header />
      <AuthUser />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/user-account" element={<UserAccount />} />
          <Route path="/control-panel/" element={<Dashboard />} />
          <Route path="/control-panel/product" element={<ProductTable />} />
          <Route path="/control-panel/order" element={<OrderTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
