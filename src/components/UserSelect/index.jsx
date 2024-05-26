import React, { useEffect, useState } from 'react'
import Select, { createFilter } from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import './index.scss'

function UserSelect(props) {
  const [roleOptions, setRoleOptions] = useState([])
  // const accessToken = useSelector(state => state.auth.token)
  // const dispatch = useDispatch()
  const { onChange, selectedId, roles, selectedRole } = props

  const [selectedValue, setSelectedValue] = useState(null)

  const generateGroupOption = role => ({
    value: role.id,
    label: role.name,
    data: role,
  })

  // const fetchCategories = async () => {
  //   try {
  //     const response = await axiosInstance.get('/category', {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //     dispatch(productActions.setCategories(response.data))
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   if (accessToken) {
  //     fetchCategories()
  //   }
  // }, [accessToken])

  useEffect(() => {    
    if (roles && roles.length > 0) {
      setSelectedValue(roles.filter(role => role.name === selectedRole))
      setRoleOptions(
        roles.map(role => generateGroupOption(role))
      )
    }
  }, [roles])

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
      name="role"
      value={
        selectedValue &&
        selectedValue
      }
      options={roleOptions}
      onChange={onChange}
      unstyled
      formatOptionLabel={formatOptionLabel}
      filterOption={createFilter({
        matchFrom: 'any',
        stringify: option => `${option.label}`,
      })}
      isSearchable
      noOptionsMessage={() => 'Ролі не знайдено'}
      placeholder="Оберіть роль"
      className="react-select-container"
      classNamePrefix="react-select"
    />
  )
}

UserSelect.propTypes = {
  roles: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedRole: PropTypes.string,
}

export default UserSelect
