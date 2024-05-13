import React from 'react'
import styles from './index.module.scss'
import Sidebar from '../../components/Sidebar'

function Dashboard() {
  return (
    <div className={styles.container}>
      <Sidebar activeTab="stats"/>
      <div className={styles.holder}>sdssdsdsd</div>
    </div>
  )
}

export default Dashboard
