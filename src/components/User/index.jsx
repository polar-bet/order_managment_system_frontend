import React from 'react'
import styles from './index.module.scss'
import { BoxArrowRight, Envelope, PersonCircle } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../axiosInstance'
import { authActions } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function User() {
  const { user, accessToken } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      axiosInstance.post('/logout', {
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
          <button onClick={logout} className={styles.logout}>
            <BoxArrowRight className={styles.logout__icon} />
            <span className={styles.logout__text}>вийти</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default User
