import React from "react"

import styles from "./Latex.module.css"

const Viewport = ({ className, fontSize, width, children }) => (
  <div className={styles.viewport} style={{ width: width }}>
    <div
      className={`${className} ${styles.cleanScrollbar}`}
      style={{ fontSize: `${fontSize || 100}%` }}
    >
      {children}
    </div>
  </div>
)

export default Viewport
