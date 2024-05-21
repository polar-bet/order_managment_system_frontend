import React, { useEffect, useState } from 'react'
import Select, { createFilter } from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { productActions } from '../../store/productSlice'
import axiosInstance from '../../axiosInstance'
import styles from './index.module.scss'
import './index.scss'

function CategorySelect({ onChange }) {
  const [categoryOptions, setCategoryOptions] = useState([])
  const categories = useSelector(state => state.product.categories) || []
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  const generateGroupOption = category => ({
    value: category.id,
    label: category.name,
    data: category,
  })

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      dispatch(productActions.setCategories(response.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryOptions(
        categories.map(category => generateGroupOption(category))
      )
    }
  }, [categories])

  const formatOptionLabel = ({ label, data }) => (
    <div className={styles.option__category}>
      <div className={styles.option__infoBox}>
        <span className={styles.option__categoryName}>{label}</span>
      </div>
    </div>
  )

  return (
    <Select
      name="category"
      options={categoryOptions}
      onChange={onChange}
      unstyled
      formatOptionLabel={formatOptionLabel}
      filterOption={createFilter({
        matchFrom: 'any',
        stringify: option => `${option.label}`,
      })}
      isClearable
      isSearchable
      noOptionsMessage={() => 'Категорії не знайдено'}
      placeholder="Оберіть категорію"
      className="react-select-container"
      classNamePrefix="react-select"
    />
  )
}

export default CategorySelect
