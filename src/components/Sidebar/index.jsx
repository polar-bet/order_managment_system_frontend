import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { BarChartLine, Cart2, Truck } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function Sidebar({ activeTab }) {
  useEffect(() => {
    console.log(activeTab)
  }, [])

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <Link
            to={'/control-panel'}
            className={`${styles.list__link} ${
              activeTab === 'stats' ? styles.list__link_active : ''
            }`}
          >
            <BarChartLine /> Статистика
          </Link>
        </li>
        <li className={styles.list__item}>
          <Link
            to={'/control-panel/order'}
            className={`${styles.list__link} ${
              activeTab === 'order' ? styles.list__link_active : ''
            }`}
          >
            <Truck /> Замовлення
          </Link>
        </li>
        <li className={styles.list__item}>
          <Link
            to={'/control-panel/product'}
            className={`${styles.list__link} ${
              activeTab === 'product' ? styles.list__link_active : ''
            }`}
          >
            <Cart2 /> Товари
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
