import React from "react"

import styles from "./Modal.module.css"

export const Card = ({ item }) => (
  <a className={styles.card} href={`/view?id=${item.id}`}>
    <p>{item.name}</p>
  </a>
)
