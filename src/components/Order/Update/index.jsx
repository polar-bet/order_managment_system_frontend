import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import axiosInstance from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { XLg } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { orderActions } from '../../../store/orderSlice'
import ProductSelect from '../../ProductSelect'
import LocationPicker from '../../LocationPicker'

function UpdateOrderForm() {
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const [destination, setDestination] = useState(null)
  const [productId, setProductId] = useState(null)
  const [count, setCount] = useState(null)
  const [errors, setErrors] = useState({
    productId: null,
    count: null,
    destination: null,
  })

  const [order, setOrder] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const orders = useSelector(state => state.order.orders)

  useEffect(() => {
    if (orders) {
      const orderInfo = orders.find(order => order.id == id)
      setOrder(orderInfo)
      setProductId(orderInfo.product.id)
      setCount(orderInfo.count)
      setDestination(orderInfo.destination)
    }
  }, [id, orders])

  const handleExit = e => {
    e.preventDefault()
    navigate('/control-panel/order')
  }

  const updateOrder = async e => {
    e.preventDefault()
    try {
      const response = await axiosInstance.patch(
        `/order/${order.id}`,
        {
          product_id: productId,
          count: count,
          destination: `${destination.lat},${destination.lng}`,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      const newOrder = response.data
      const updatedOrders = orders.map(o =>
        o.id === newOrder.id ? newOrder : o
      )
      dispatch(orderActions.setOrders(updatedOrders))
      navigate('/control-panel/order')
    } catch (error) {
      console.log(error)
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
    if (location) {
      // console.log(location);
      // const { lat, lng } = location

      setDestination(location)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={updateOrder}>
        <div className={styles.upperContainer}>
          <div className={styles.exitButtonHolder}>
            <button onClick={handleExit} className={styles.exitButton}>
              <XLg />
            </button>
          </div>
          <h1 className={styles.title}>Змінити замовлення</h1>
        </div>
        <div className={styles.form__group}>
          <ProductSelect
            onChange={handleSelectClick}
            selectedId={parseInt(productId)}
          />
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
              value={count}
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
            <LocationPicker
              initialPosition={destination}
              onLocationSelect={handleLocationSelect}
            />
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
          <button className={styles.form__button}>Змінити</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateOrderForm
