import React, { useEffect, useState } from 'react'
import Select, { createFilter } from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { productActions } from '../../../store/productSlice'
import axiosInstance from '../../../api/axiosInstance'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import './index.scss'

function ProductSelect(props) {
  const [productOptions, setProductOptions] = useState([])
  const products = useSelector(state => state.product.products) || []
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const { onChange, selectedId } = props

  const generateGroupOption = product => ({
    value: product.id,
    label: product.name,
    data: product,
  })

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/product', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      dispatch(productActions.setProducts(response.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (accessToken) {
      fetchProducts()
    }
  }, [accessToken])

  useEffect(() => {
    if (products.length > 0) {
      setProductOptions(products.map(product => generateGroupOption(product)))
    }
  }, [products])

  const formatOptionLabel = ({ label, data }) => (
    <div className={styles.option__category}>
      <div className={styles.option__infoBox}>
        <span className={styles.option__categoryName}>{label}</span>
      </div>
    </div>
  )

  return (
    <Select
      required
      name="product"
      value={selectedId && productOptions.find(
        productOption => productOption.value === selectedId
      )}
      options={productOptions}
      onChange={onChange}
      unstyled
      formatOptionLabel={formatOptionLabel}
      filterOption={createFilter({
        matchFrom: 'any',
        stringify: option => `${option.label}`,
      })}
      isClearable
      isSearchable
      maxMenuHeight={'150px'}
      noOptionsMessage={() => 'Товари не знайдено'}
      placeholder="Оберіть товар"
      className="react-select-container"
      classNamePrefix="react-select"
    />
  )
}

ProductSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedId: PropTypes.number,
}

export default ProductSelect
