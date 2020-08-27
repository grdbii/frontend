import React from "react"

import Particles from "react-particles-js"
import particleOptions from "../../assets/particles.json"

import "./skeleton.css"
import styles from "./Layout.module.css"

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Particles className={styles.particles} params={particleOptions} />
      <main>{children}</main>
      <footer>©2020 Calvin Ross, Mustapha Ishak</footer>
    </div>
  )
}

export default Layout
