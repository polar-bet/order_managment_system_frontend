import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import OrderTable from '../../pages/OrderTable'
import styles from './index.module.scss'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../pages/ProductTable'
import MyProductTable from '../../pages/MyProductTable'
import Chats from '../../pages/Chats'

function ControlPanelLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.holder}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/order/*" element={<OrderTable />} />
          <Route path="/product" element={<ProductTable />} />
          <Route path="/my-product/*" element={<MyProductTable />} />
          <Route path="/chats/*" element={<Chats />} />
        </Routes>
      </div>
    </div>
  )
}

export default ControlPanelLayout