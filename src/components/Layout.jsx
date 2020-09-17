import React, { useState } from "react"

import Particles from "react-particles-js"
import particleOptions from "../../assets/particles.json"

import { Modal, ModalContext } from "./Modal"

import "./skeleton.css"
import styles from "./Layout.module.css"

const Layout = ({ children }) => {
  const [modalState, setModal] = useState(true)

  return (
    <div className={styles.layout}>
      <Particles className={styles.particles} params={particleOptions} />
      <main>
        <ModalContext.Provider value={setModal}>
          {modalState && <Modal />}
          {children}
        </ModalContext.Provider>
      </main>
      <footer>©2020 Calvin Ross, Mustapha Ishak</footer>
    </div>
  )
}

export default Layout
