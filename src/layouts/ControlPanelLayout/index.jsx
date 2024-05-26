import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import OrderTable from '../../pages/OrderTable'
import styles from './index.module.scss'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../pages/ProductTable'
import MyProductTable from '../../pages/MyProductTable'
import TraderRequestTable from '../../pages/TraderRequestTable'
import AdminRequestTable from '../../pages/AdminRequestTable'
import { useSelector } from 'react-redux'
import ChatLayout from '../ChatLayout'
import TraderRoute from '../../components/ProtectedRoutes/TraderRoute'
import AdminRoute from '../../components/ProtectedRoutes/AdminRoute'
import NotAdminRoute from '../../components/ProtectedRoutes/NotAdminRoute'

function ControlPanelLayout() {
  const user = useSelector(state => state.auth.user)

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.holder}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<ProductTable />} />
          <Route element={<NotAdminRoute />}>
            <Route path="/order/*" element={<OrderTable />} />
            <Route path="/chats/*" element={<ChatLayout />} />
          </Route>
          <Route element={<TraderRoute />}>
            <Route path="/my-product/*" element={<MyProductTable />} />
            <Route path="/trader/request" element={<TraderRequestTable />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin/request" element={<AdminRequestTable />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default ControlPanelLayout
