import React, { useState } from "react"
import styled from "styled-components"
import Particles from "react-particles-js"
import particleOptions from "../assets/particles.json"

import Modal, { ModalContext } from "./Modal"

import "../assets/styles.css"

const Container = styled.div`
  overflow: hidden;
`

const ParticlesOverlay = styled(Particles)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1000;
`

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Footer = styled.footer`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2.5rem;
  text-align: center;

  opacity: 0.5;
`

const Layout = props => {
  const [modalState, setModal] = useState(false)

  return (
    <Container>
      <ParticlesOverlay params={particleOptions} />
      <MainContainer>
        <ModalContext.Provider value={setModal}>
          {modalState && <Modal />}
          {props.children}
        </ModalContext.Provider>
      </MainContainer>
      <Footer>©2020 Calvin Ross, Mustapha Ishak</Footer>
    </Container>
  )
}

export default Layout
