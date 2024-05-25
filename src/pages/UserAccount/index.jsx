import React from 'react'
import styles from './index.module.scss'
import User from '../../components/User'
import { BoxArrowRight } from 'react-bootstrap-icons'
import { ToastContainer } from 'react-toastify'

function UserAccount() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.holder}>
          <User />
        </div>
      </div>
    </div>
  )
}

export default UserAccount
