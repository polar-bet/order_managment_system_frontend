import React, { useState } from 'react'
import styles from './index.module.scss'
import Sidebar from '../../components/Sidebar'

function ProductTable() {
  const [products, setProducts] = useState(null)

  return (
    <div className={styles.container}>
      <Sidebar activeTab="product" />
      <div className={styles.holder}>
        <table className={styles.table}>
          <thead className={styles.table__head}>
            <tr className={styles.head__row}>
              <th className={styles.head__data}>ID</th>
              <th className={styles.head__data}>Категорія</th>
              <th className={styles.head__data}>Назва</th>
              <th className={styles.head__data}>Власник</th>
              <th className={styles.head__data}>В наявності</th>
              <th className={styles.head__data}>Ціна</th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {products ? (
              products.map(item, index => (
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

export default ProductTable
