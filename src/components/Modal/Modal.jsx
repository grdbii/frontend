import React, { createContext, useContext, useReducer, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import { list } from "../../util/request"
import { Card } from "./Card"

import styles from "./Modal.module.css"

export const ModalContext = createContext(() => null)

export const Modal = () => {
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
      const fetched = await list(state.page)
      setState({ type: "sync", page: fetched.p, items: fetched.list })
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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.exitIcon} onClick={() => setModal(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className={styles.cleanScrollbar} onScroll={handleScroll}>
          <div className={styles.cardContainer}>
            {state.list.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
