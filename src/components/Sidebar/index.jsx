import React from 'react'
import './index.scss'
import styles from './index.module.scss'
import {
  BarChartLine,
  Cart2,
  CartPlus,
  ChatLeftText,
  Truck,
} from 'react-bootstrap-icons'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Sidebar() {
  const { user } = useSelector(state => state.auth)

  return (
    <div id="sidebar" className={styles.container}>
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
        {user && user.role === 'trader' && (
          <li className={styles.list__item}>
            <NavLink
              activeclassname="active"
              to={'/control-panel/request'}
              className={styles.list__link}
            >
              <Truck /> Запити
            </NavLink>
          </li>
        )}
        <li className={styles.list__item}>
          <NavLink
            activeclassname="active"
            to={'/control-panel/product'}
            className={styles.list__link}
          >
            <Cart2 /> Товари
          </NavLink>
        </li>
        {user && user.role === 'trader' && (
          <li className={styles.list__item}>
            <NavLink
              activeclassname="active"
              to={'/control-panel/my-product'}
              className={styles.list__link}
            >
              <CartPlus /> Мої товари
            </NavLink>
          </li>
        )}
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
