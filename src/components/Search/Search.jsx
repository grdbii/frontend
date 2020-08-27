import React, { useState, useEffect } from "react"

import { search } from "../../util/request"
import SearchBar from "./SearchBar"

import styles from "./Search.module.css"

export const Search = () => {
  const [suggestions, setSuggestions] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setSuggestions(await search(query))
    }

    fetchData()
  }, [query])

  return (
    <div className={styles.search}>
      <SearchBar
        suggestions={suggestions}
        query={query}
        handleInput={setQuery}
      />
    </div>
  )
}
