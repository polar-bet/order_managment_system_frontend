import React, { useState } from 'react'
import styles from './index.module.scss'
import axiosInstance from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { XLg } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productActions } from '../../../store/productSlice'

function CreateCategoryForm() {
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const [name, setName] = useState(null)
  const [errors, setErrors] = useState({
    name: null,
  })
  const navigate = useNavigate()
  const categories = useSelector(state => state.product.categories)

  const handleExit = e => {
    e.preventDefault()
    navigate('/control-panel/category')
  }

  const createCategory = async e => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post(
        '/admin/category',
        {
          name: name,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      const newCategory = response.data

      const updatedCategories = [...categories, newCategory]

      dispatch(productActions.setCategories(updatedCategories))

      toast.success('Категорію створено')

      navigate('/control-panel/category')
    } catch (error) {
      const errors = error.response.data.errors
      setErrors({
        name: errors.name,
      })
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={createCategory}>
        <div className={styles.upperContainer}>
          <div className={styles.exitButtonHolder}>
            <button onClick={handleExit} className={styles.exitButton}>
              <XLg />
            </button>
          </div>
          <h1 className={styles.title}>Створення категорії</h1>
        </div>
        <div className={styles.form__group}>
          <div className={styles.form__inputGroup}>
            <input
              type="text"
              required
              placeholder=""
              className={styles.form__input}
              onChange={e => setName(e.target.value)}
            />
            <label className={styles.form__label}>Назва категорії</label>
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
          <button className={styles.form__button}>Створити</button>
        </div>
      </form>
    </div>
  )
}

export default CreateCategoryForm
