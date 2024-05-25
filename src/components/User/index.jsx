import React from 'react'
import styles from './index.module.scss'
import {
  BoxArrowRight,
  CashCoin,
  Envelope,
  PersonCircle,
  PersonFillUp,
} from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../api/axiosInstance'
import { authActions } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function User() {
  const user = useSelector(state => state.auth.user)
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      dispatch(authActions.logout())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeAccount = async () => {
    try {
      const response = await axiosInstance.put('/user/trader-account', null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      dispatch(authActions.setUser(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.user}>
      {user && (
        <div className={styles.holder}>
          <div className={styles.user__container}>
            <div className={styles.user__image}>
              <PersonCircle />
            </div>
            <div className={styles.user__name}>{user.name}</div>
            <div className={styles.user__email}>
              <div className={styles.email__title}>
                <Envelope />
              </div>
              <div className={styles.email__value}>{user.email}</div>
            </div>
          </div>
          <ul className={styles.actionList}>
            {user.role == 'user' && (
              <li className={styles.actionList__item}>
                <button
                  onClick={handleChangeAccount}
                  className={`${styles.button} ${styles.changeAccount}`}
                >
                  <PersonFillUp className={styles.button__icon} />
                  <span className={styles.button__text}>
                    Змінити на аккаунт торговця
                  </span>
                </button>
              </li>
            )}
            <li className={styles.actionList__item}>
              <button
                onClick={handleLogout}
                className={`${styles.button} ${styles.logout}`}
              >
                <BoxArrowRight className={styles.button__icon} />
                <span className={styles.button__text}>Вийти</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
    </div>
  )
}

export default User
