import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import axiosInstance from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../../store/productSlice'
import { XLg } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import CategorySelect from '../CategorySelect'
import { ToastContainer, toast } from 'react-toastify'

function CreateProductForm() {
  const categories = useSelector(state => state.product.categories)
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const [name, setName] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [count, setCount] = useState(null)
  const [price, setPrice] = useState(null)
  const [errors, setErrors] = useState({
    name: null,
    categoryId: null,
    count: null,
    price: null,
  })
  const navigate = useNavigate()
  const products = useSelector(state => state.product.products)

  const handleExit = e => {
    e.preventDefault()

    navigate('/control-panel/my-product/')
  }

  const createProduct = async e => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post(
        '/trader/product',
        {
          name: name,
          category_id: categoryId,
          count: count,
          price: price,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      const newProduct = response.data
      const updatedProducts = [...products, newProduct]

      dispatch(productActions.setProducts(updatedProducts))

      toast.success('Товар додано')

      navigate('/control-panel/my-product/')
    } catch (error) {
      const errors = error.response.data.errors
      setErrors({
        name: errors.name,
        categoryId: errors.category_id,
        count: errors.count,
        price: errors.price,
      })
    }
  }

  const handleSelectClick = selectedOption => {
    setCategoryId(selectedOption.value)
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
          <h1 className={styles.title}>Створити товар</h1>
        </div>
        <div className={styles.form__group}>
          <div className={styles.form__inputGroup}>
            <input
              required
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder=""
              className={styles.form__input}
            />
            <label className={styles.form__label}>Назва</label>
          </div>
          {errors.name && (
            <ul className={styles.form__errorList}>
              {errors.name.map((item, index) => (
                <li key={index} className={styles.form__error}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.form__group}>
          <CategorySelect onChange={handleSelectClick} />
          {errors.categoryId && (
            <ul className={styles.form__errorList}>
              {errors.categoryId.map((item, index) => (
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
            <input
              type="number"
              required
              min={1}
              max={1000000}
              step={1}
              placeholder=""
              className={styles.form__input}
              onChange={e => setPrice(e.target.value)}
            />
            <label className={styles.form__label}>Ціна</label>
          </div>
          {errors.price && (
            <ul className={styles.form__errorList}>
              {errors.price.map((item, index) => (
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

export default CreateProductForm
