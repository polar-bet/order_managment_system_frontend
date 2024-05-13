import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { PersonCircle } from 'react-bootstrap-icons'

function Header() {
  const user = useSelector(state => state.auth.user)

  return (
    <header className={styles.header}>
      <div className={styles.header__leftContainer}>
        <Link to={'/'} className={styles.header__iconLink}>
          <img src="/icon.png" className={styles.header__icon} />
          <span className={styles.header__name}>ORDER WISDOM</span>
        </Link>
        <Link to={'/about-us'} className={styles.header__link}>
          Про нас
        </Link>
        {user && (
          <Link to={'/control-panel'} className={styles.header__link}>
            Мої замовлення
          </Link>
        )}
      </div>
      {/* <Search /> */}
      {user ? (
        <Link to={'/user-account'} className={styles.header__userAccountLink}>
          <PersonCircle className={styles.user__icon} />
          <span className={styles.user__name}>{user.name}</span>
        </Link>
      ) : (
        <Link to={'/login'} className={styles.header__authLink}>
          УВІЙТИ
        </Link>
      )}
    </header>
  )
}

export default Header
