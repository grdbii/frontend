import React from "react"

import styles from "./Search.module.css"

const Suggestions = ({ suggestions, query }) => (
  <ul className={styles.searchSuggestions}>
    {suggestions.map((suggestion, index) => (
      <a
        key={`${query}/${index}`}
        className={styles.searchSuggestion}
        href={`/view?id=${suggestion.id}`}
      >
        <li dangerouslySetInnerHTML={{ __html: suggestion.match }}></li>
      </a>
    ))}
  </ul>
)

export default Suggestions
