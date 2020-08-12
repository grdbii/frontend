import React from "react"

import styles from "./Search.module.css"

const ResultsList = ({ results }) => (
  <ul className={styles.searchResultList}>
    {results.map((result, index) => (
      <a
        key={`${results[1]}/${index}`}
        className={styles.searchResult}
        href={`/view?m=${result[1]}`}
      >
        <li dangerouslySetInnerHTML={{ __html: result[0] }}></li>
      </a>
    ))}
  </ul>
)

export default ResultsList
