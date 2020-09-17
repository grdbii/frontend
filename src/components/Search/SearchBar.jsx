import React, { useContext, useRef } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faListUl } from "@fortawesome/free-solid-svg-icons"
import ReactTooltip from "react-tooltip"

import Suggestions from "./Suggestions"
import { ModalContext } from "../Modal"

import styles from "./Search.module.css"

const SearchBar = ({ suggestions, query, handleInput }) => {
  const ref = useRef(null)
  const setModal = useContext(ModalContext)

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
      <div className={styles.listAll}>
        <button
          className={styles.listAllButton}
          data-tip
          data-for="listAll"
          onClick={() => setModal(true)}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <ReactTooltip id="listAll" className={styles.tooltip} effect="solid">
          <span>List All Metrics</span>
        </ReactTooltip>
      </div>
      <Suggestions suggestions={suggestions} query={query} />
    </div>
  )
}

export default SearchBar
