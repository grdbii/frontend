import React from "react"

import styles from "./Title.module.css"

const PrimaryTitle = ({ title, subtitle }) => (
  <div className={styles.primaryContainer}>
    <div className={styles.pageTitle}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  </div>
)

export default PrimaryTitle
