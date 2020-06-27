import React from "react"
import { Link } from "gatsby"

import styles from "./Title.module.css"

const SecondaryTitle = ({ title, section }) => (
  <div className={styles.secondaryContainer}>
    <div className={styles.pageTitle}>
      <h1><Link className={styles.homeLink} to="/">{title}</Link></h1>
      <h2>{section}</h2>
    </div>
  </div>
)

export default SecondaryTitle
