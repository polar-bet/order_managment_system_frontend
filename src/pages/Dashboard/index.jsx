import React from 'react'
import styles from './index.module.scss'
import OrderChart from '../../components/Chart'

function Dashboard() {
  return (
    <div className={styles.container}>
      <OrderChart />
      </div>
  )
}

export default Dashboard
