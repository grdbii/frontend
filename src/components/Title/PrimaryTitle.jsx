import React from "react"

import styles from "./Title.module.css"

const PrimaryTitle = ({ title }) => (
  <div className={styles.primaryContainer}>
    <div className={styles.pageTitle}>
      <h1>{title}</h1>
    </div>
  </div>
)

export default PrimaryTitle
