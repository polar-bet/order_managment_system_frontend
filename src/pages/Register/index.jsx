import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosInstance'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice'

function Register() {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const register = async e => {
    e.preventDefault()

    try {
      let response = await axiosInstance.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })

      dispatch(authActions.setToken(response.data))
      navigate('/')
    } catch (error) {
      let errors = error.response.data.errors

      setErrors({
        name: errors.name,
        email: errors.email,
        password: errors.password,
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.placeholder}>
          <div id={styles.login} className={styles.placeholder__content}>
            <div className={styles.placeholder__text}>
              Маєте обліковий запис? Увійдіть, щоб користуватись нашим сервісом.
            </div>
            <Link to={'/login'} className={styles.placeholder__buttonContainer}>
              <div className={styles.placeholder__button}>Увійти</div>
            </Link>
          </div>
        </div>
        <div className={styles.formHolder}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={e => register(e)}>
              <h1 className={styles.form__title}>Реєстрація</h1>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="text"
                    onChange={e => setName(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>Ім'я</label>
                </div>
                {errors.name && (
                  <ul className={styles.form__errorList}>
                    {errors.name.map(item => (
                      <li className={styles.form__error}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
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
                    {errors.email.map(item => (
                      <li className={styles.form__error}>{item}</li>
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
                    {errors.password.map(item => (
                      <li className={styles.form__error}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="password"
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>
                    Підтвердження паролю
                  </label>
                </div>
              </div>
              <div className={styles.form__buttonContainer}>
                <div className={styles.form__buttonHolder}>
                  <button className={styles.form__button}>
                    Зареєструватись
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
