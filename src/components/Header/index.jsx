import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './index.module.scss'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { PersonCircle } from 'react-bootstrap-icons'

function Header() {
  const user = useSelector(state => state.auth.user)

  return (
    <header className={styles.header}>
      <div id="left-container" className={styles.header__leftContainer}>
        <Link to={'/'} className={styles.header__iconLink}>
          <img src="/icon.png" className={styles.header__icon} />
          <span className={styles.header__name}>ORDER WISDOM</span>
        </Link>
        <NavLink
          activeclassname="active"
          to={'/about-us'}
          className={styles.header__link}
        >
          Про нас
        </NavLink>
        {user && (
          <NavLink
            activeclassname="active"
            to={'/control-panel'}
            className={styles.header__link}
          >
            Мої замовлення
          </NavLink>
        )}
      </div>
      {/* <Search /> */}
      {user ? (
        <NavLink
          id="user-link"
          activeclassname="active"
          to={'/user-account'}
          className={styles.header__userAccountLink}
        >
          <PersonCircle className={styles.user__icon} />
          <span className={styles.user__name}>{user.name}</span>
        </NavLink>
      ) : (
        <Link to={'/login'} className={styles.header__authLink}>
          УВІЙТИ
        </Link>
      )}
    </header>
  )
}

export default Header
