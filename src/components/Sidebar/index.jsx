import React, { useEffect } from 'react'
import './index.scss'
import styles from './index.module.scss'
import { BarChartLine, Cart2, ChatLeftText, Truck } from 'react-bootstrap-icons'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div id='sidebar' className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <NavLink
            end
            activeclassname="active"
            to={'/control-panel'}
            className={styles.list__link}
          >
            <BarChartLine /> Статистика
          </NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink
            activeclassname="active"
            to={'/control-panel/order'}
            className={styles.list__link}
          >
            <Truck /> Замовлення
          </NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink
            activeclassname="active"
            to={'/control-panel/product'}
            className={styles.list__link}
          >
            <Cart2 /> Товари
          </NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink
            activeclassname="active"
            to={'/control-panel/chats'}
            className={styles.list__link}
          >
            <ChatLeftText /> Чати
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
