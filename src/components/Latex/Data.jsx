import React from "react"

import styles from "./Latex.module.css"

const Data = ({ title, children }) => (
  <div className={styles.dataLayout}>
    <h3>{title}:</h3>
    <div className={styles.data}>
      {children}
    </div>
  </div>
)

export default Data
