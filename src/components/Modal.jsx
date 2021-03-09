import React, { createContext, useContext, useReducer, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import ScrollArea from "./ScrollArea"

import "../assets/styles.css"

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  background-color: var(--overlay-background);

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation-name: fadein;
  animation-timing-function: ease;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
`

const Container = styled.div`
  position: relative;
  width: 70rem;
  height: 75%;

  background-color: white;
  border-radius: 1rem;
  box-shadow: var(--shadow-active);

  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(-15%);
    }

    75% {
      opacity: 1;
    }

    100% {
      transform: translateY(0);
    }
  }

  animation-name: slide;
  animation-timing-function: ease;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
`

const ScrollContainer = styled.div`
  position: absolute;
  top: 4rem;
  right: 1.6rem;
  bottom: 3rem;
  left: 0;
`

const ExitIcon = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  font-size: 2rem;
  color: var(--color-inactive-1);

  transition: color 100ms ease;

  &:hover {
    color: var(--color-active-1);
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 0 2rem;
`

const Card = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  margin: 0.5rem 0;
  width: 100%;
  height: 5rem;

  background-color: white;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-active);

  &:hover {
    background-color: var(--light-grey-1);
  }
`

const ModalContext = createContext(() => null)

const Modal = () => {
  const setModal = useContext(ModalContext)

  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "fetch":
          if (!state.maxed) {
            return { ...state, fetching: true }
          } else {
            return state
          }

        case "sync":
          if (action.items.length !== 0) {
            return {
              list: [...state.list, ...action.items],
              page: action.page,
              fetching: false,
            }
          } else {
            return { ...state, maxed: true }
          }

        default:
          return state
      }
    },
    { list: [], page: 0, fetching: false, maxed: false }
  )

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:4001/list?p=${state.page}`)

      setState({ type: "sync", page: result.data.p, items: result.data.list })
    }

    state.fetching && fetchData()
  }, [state.fetching, state.page])

  useEffect(() => {
    const handleKeypress = event => {
      if (event.keyCode === 27) {
        setModal(false)
      }
    }

    window.addEventListener("keydown", handleKeypress)
    return () => window.removeEventListener("keydown", handleKeypress)
  })

  const handleScroll = event => {
    const target = event.target
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setState({ type: "fetch" })
    }
  }

  if (state.list.length === 0 && !state.fetching) {
    setState({ type: "fetch" })
  }

  const cards = state.list.map((item, index) => (
    <Card key={index} href={`/view?id=${item.id}`}>
      {item.name}
    </Card>
  ))

  return (
    <Overlay onClick={() => setModal(false)}>
      <Container onClick={(event) => event.stopPropagation()}>
        <ExitIcon onClick={() => setModal(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </ExitIcon>
        <ScrollContainer>
          <ScrollArea onScroll={handleScroll}>
            <CardContainer>{cards}</CardContainer>
          </ScrollArea>
        </ScrollContainer>
      </Container>
    </Overlay>
  )
}

export { ModalContext }
export default Modal
