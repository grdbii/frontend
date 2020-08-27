import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import Suggestions from "./Suggestions"

import styles from "./Search.module.css"

const SearchBar = ({ suggestions, query, handleInput }) => {
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
        placeholder="Search spacetimes..."
        aria-label="Search GRDBII Database"
        maxLength="2048"
        spellCheck="false"
        autoCorrect="false"
        autoComplete="false"
        onChange={e => handleInput(e.target.value)}
        onFocus={addHighlight}
        onBlur={removeHighlight}
      />
      <Suggestions suggestions={suggestions} query={query} />
    </div>
  )
}

export default SearchBar
