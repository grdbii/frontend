import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import ResultsList from "./ResultsList"

import styles from "./Search.module.css"

const SearchBar = ({ suggestions, handleInput }) => {
  const ref = React.createRef()
  const addHighlight = () => {
    ref.current.classList.add(styles.highlight)
  }
  const removeHighlight = () => {
    ref.current.classList.remove(styles.highlight)
  }

  return (
    <div className={styles.searchBar} ref={ref}>
      <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
      <input
        className={styles.searchInput}
        type="text"
        name="query"
        aria-label="Search GRDBII Database"
        maxLength="2048"
        spellCheck="false"
        autoCorrect="false"
        autoComplete="false"
        onChange={e => handleInput(e.target.value)}
        onFocus={addHighlight}
        onBlur={removeHighlight}
      />
      <ResultsList results={suggestions} />
    </div>
  )
}

export default SearchBar
