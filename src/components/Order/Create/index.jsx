import React, { useState } from 'react'
import styles from './index.module.scss'
import axiosInstance from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { XLg } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import LocationPicker from '../../LocationPicker'
import ProductSelect from '../../ProductSelect'
import { orderActions } from '../../../store/orderSlice'

function CreateOrderForm() {
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const [productId, setProductId] = useState(null)
  const [count, setCount] = useState(null)
  const [destination, setDestination] = useState(null)
  const [errors, setErrors] = useState({
    productId: null,
    count: null,
    destination: null,
  })
  const navigate = useNavigate()
  const orders = useSelector(state => state.order.orders)

  const handleExit = e => {
    e.preventDefault()
    navigate('/control-panel/order')
  }

  const createProduct = async e => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post(
        '/order',
        {
          product_id: productId,
          count: count,
          destination: destination,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      const newOrder = response.data
      const updatedOrders = [...orders, newOrder]

      dispatch(orderActions.setOrders(updatedOrders))
      navigate('/control-panel/order')
    } catch (error) {
      const errors = error.response.data.errors
      setErrors({
        productId: errors.product_id,
        count: errors.count,
        destination: errors.destination,
      })
    }
  }

  const handleSelectClick = selectedOption => {
    setProductId(selectedOption.value)
  }

  const handleLocationSelect = location => {
    setDestination(`${location.lat},${location.lng}`)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={createProduct}>
        <div className={styles.upperContainer}>
          <div className={styles.exitButtonHolder}>
            <button onClick={handleExit} className={styles.exitButton}>
              <XLg />
            </button>
          </div>
          <h1 className={styles.title}>Створити замовлення</h1>
        </div>
        <div className={styles.form__group}>
          <ProductSelect onChange={handleSelectClick} />
          {errors.productId && (
            <ul className={styles.form__errorList}>
              {errors.productId.map((item, index) => (
                <li key={index} className={styles.form__error}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.form__group}>
          <div className={styles.form__inputGroup}>
            <input
              type="number"
              required
              min={1}
              placeholder=""
              className={styles.form__input}
              onChange={e => setCount(e.target.value)}
            />
            <label className={styles.form__label}>Кількість</label>
          </div>
          {errors.count && (
            <ul className={styles.form__errorList}>
              {errors.count.map((item, index) => (
                <li key={index} className={styles.form__error}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.form__group}>
          <div className={styles.form__inputGroup}>
            <label className={styles.form__labelStatic}>
              Пункт призначення
            </label>
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>
          {errors.destination && (
            <ul className={styles.form__errorList}>
              {errors.destination.map((item, index) => (
                <li key={index} className={styles.form__error}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.form__group}>
          <button className={styles.form__button}>Створити</button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrderForm
