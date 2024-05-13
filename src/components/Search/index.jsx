import React from 'react'
import { Search as SearchIcon } from 'react-bootstrap-icons'
import styles from "./index.module.scss"

function Search() {
  return (
    <div className={styles.search}>
      <SearchIcon className={styles.search__icon} fill='white'></SearchIcon>
    </div>
  )
}

export default Search
