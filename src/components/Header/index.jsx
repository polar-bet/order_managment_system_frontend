import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { List, PersonCircle, XLg } from 'react-bootstrap-icons'

function Header() {
  const user = useSelector(state => state.auth.user)
  const [isBurgerVisible, setBurgerVisibility] = useState(false)
  const navigate = useNavigate()
  const burgerRef = useRef()

  useEffect(() => {
    setBurgerVisibility(false)
  }, [navigate])

  const handleBurgerClick = () => {
    setBurgerVisibility(!isBurgerVisible)
  }

  return (
    <header className={styles.header}>
      <div id="link-container" className={styles.header__leftContainer}>
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
            Панель керування
          </NavLink>
        )}
      </div>
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

      <button onClick={handleBurgerClick} className={styles.burger}>
        {isBurgerVisible ? <XLg /> : <List />}
      </button>

      <div
        ref={burgerRef}
        className={`${styles.burgerMenuContainer} ${
          isBurgerVisible ? styles.burger_opened : ''
        }`}
      >
        <div className={styles.burgerMenu}>
          <div id="link-container" className={styles.burger__linkContainer}>
            <NavLink
              activeclassname="active"
              to={'/about-us'}
              className={styles.burger__link}
            >
              Про нас
            </NavLink>
            {user && (
              <NavLink
                activeclassname="active"
                to={'/control-panel'}
                className={styles.burger__link}
              >
                Панель керування
              </NavLink>
            )}
          </div>

          {user ? (
            <NavLink
              id="user-link"
              activeclassname="active"
              to={'/user-account'}
              className={styles.burger__userAccountLink}
            >
              <PersonCircle className={styles.user__icon} />
              <span className={styles.user__name}>{user.name}</span>
            </NavLink>
          ) : (
            <Link to={'/login'} className={styles.burger__authLink}>
              УВІЙТИ
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
