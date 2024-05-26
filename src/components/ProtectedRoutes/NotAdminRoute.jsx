import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const user = useSelector(state => state.auth.user)

  return user && user.role !== 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/control-panel" />
  )
}

export default AdminRoute
