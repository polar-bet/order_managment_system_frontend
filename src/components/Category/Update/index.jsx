import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import axiosInstance from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { XLg } from 'react-bootstrap-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productActions } from '../../../store/productSlice'

function UpdateCategoryForm() {
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  const [name, setName] = useState(null)
  const [errors, setErrors] = useState({
    name: null,
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const categories = useSelector(state => state.product.categories)

  const handleExit = e => {
    e.preventDefault()
    navigate('/control-panel/category')
  }

  useEffect(() => {
    if (categories) {
      const currentCategory = categories.filter(item => item.id == id)[0]
      setName(currentCategory.name)
    }
  }, [id, categories])

  const createCategory = async e => {
    e.preventDefault()

    try {
      const response = await axiosInstance.put(
        `/admin/category/${id}`,
        {
          name: name,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      const updatedCategories = categories.map(c =>
        c.id == id ? response.data : c
      )

      dispatch(productActions.setCategories(updatedCategories))

      toast.success('Категорію оновлено')

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
          <h1 className={styles.title}>Редагування категорії</h1>
        </div>
        <div className={styles.form__group}>
          <div className={styles.form__inputGroup}>
            <input
              type="text"
              required
              placeholder=""
              value={name}
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
          <button className={styles.form__button}>Оновити</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateCategoryForm
