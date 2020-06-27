import React from "react"

import styles from "./Search.module.css"

const ResultsList = ({ results }) => (
  <ul className={styles.searchResultList}>
    {results.map(result =>
    <a
      className={styles.searchResult}
      href={`/view?m=${result[1]}`}
    >
      <li dangerouslySetInnerHTML={{__html: result[0]}}></li>
    </a>
    )}
  </ul>
)

export default ResultsList
