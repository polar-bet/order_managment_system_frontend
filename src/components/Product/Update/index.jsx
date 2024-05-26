import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import axiosInstance from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../../store/productSlice'
import { XLg } from 'react-bootstrap-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CategorySelect from '../CategorySelect'
import { PropTypes } from 'prop-types'
import { toast } from 'react-toastify'

function UpdateProductForm() {
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

  const [product, setProduct] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const products = useSelector(state => state.product.products)

  useEffect(() => {
    if (products) {
      const productInfo = products.find(product => product.id == id)
      setProduct(productInfo)
      setName(productInfo.name)
      setCategoryId(productInfo.category.id)
      setCount(productInfo.count)
      setPrice(productInfo.price)
    }
  }, [id, products])

  const updateProduct = async e => {
    e.preventDefault()

    try {
      const response = await axiosInstance.patch(
        `/trader/product/${product.id}`,
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
      const updatedProducts = products.map(p =>
        p.id === newProduct.id ? newProduct : p
      )

      dispatch(productActions.setProducts(updatedProducts))

      toast.success('Товар змінено')

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
    if (selectedOption) {
      setCategoryId(selectedOption.value)
    }
  }

  const handleExit = e => {
    e.preventDefault()

    navigate('/control-panel/my-product/')
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={updateProduct}>
        <div className={styles.upperContainer}>
          <div className={styles.exitButtonHolder}>
            <button onClick={handleExit} className={styles.exitButton}>
              <XLg />
            </button>
          </div>
          <h1 className={styles.title}>Змінити товар</h1>
        </div>
        <div className={styles.form__group}>
          <div className={styles.form__inputGroup}>
            <input
              value={name}
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
          <CategorySelect
            onChange={handleSelectClick}
            selectedId={parseInt(categoryId)}
          />
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
              value={count}
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
              value={price}
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
          <button className={styles.form__button}>Змінити</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProductForm
