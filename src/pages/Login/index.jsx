import React, { useRef, useState } from 'react'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosInstance'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice'

function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async e => {
    e.preventDefault()

    try {
      let response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      })

      dispatch(authActions.setToken(response.data))
      navigate('/')
    } catch (error) {
      let errors = error.response.data.errors

      setErrors({
        email: errors.email,
        password: errors.password,
      })
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.placeholder}>
          <div className={styles.placeholder__content}>
            <div className={styles.placeholder__text}>
              Немаєте облікового запису? Створіть новий, щоб користуватись нашим
              сервісом.
            </div>
            <Link
              to={'/register'}
              className={styles.placeholder__buttonContainer}
            >
              <div className={styles.placeholder__button}>Зареєструватись</div>
            </Link>
          </div>
        </div>
        <div className={styles.formHolder}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={e => login(e)}>
              <h1 className={styles.form__title}>Вхід</h1>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>Електронна пошта</label>
                </div>
                {errors.email && (
                  <ul className={styles.form__errorList}>
                    {errors.email.map((item, index) => (
                      <li key={index} className={styles.form__error}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>Пароль</label>
                </div>
                {errors.password && (
                  <ul className={styles.form__errorList}>
                    {errors.password.map((item, index) => (
                      <li key={index} className={styles.form__error}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.form__buttonContainer}>
                <div className={styles.form__buttonHolder}>
                  <button className={styles.form__button}>Увійти</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
