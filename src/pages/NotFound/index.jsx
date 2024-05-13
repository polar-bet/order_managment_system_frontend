import React from 'react'
import styles from './index.module.scss'

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <h1 className={styles.title}>Сторінку не знайдено</h1>
      </div>
    </div>
  )
}

export default NotFound
