import React, { useState } from 'react'
import styles from './index.module.scss'
import Sidebar from '../../components/Sidebar'

function OrderTable() {
  const [orders, setOrders] = useState(null)

  return (
    <div className={styles.container}>
      <Sidebar activeTab="order" />
      <div className={styles.holder}>
        <table className={styles.table}>
          <thead className={styles.table__head}>
            <tr className={styles.head__row}>
              <th className={styles.head__data}>ID</th>
              <th className={styles.head__data}>Код товару</th>
              <th className={styles.head__data}>Замовник</th>
              <th className={styles.head__data}>Кількість</th>
              <th className={styles.head__data}>Адреса</th>
              <th className={styles.head__data}>Статус</th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {orders ? (
              orders.map(item, index => (
                <tr key={index} className={styles.table__row}>
                  <td className={styles.table__data}>
                    <Link
                      to={`/control-panel/order/${item.id}`}
                      className={styles.table__link}
                    >
                      {item}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className={styles.table__row}>
                <td className={`${styles.table__data} ${styles.table__empty}`}>
                  Таблиця пуста
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable
