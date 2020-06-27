import React from "react"

import { CopyToClipboard } from "react-copy-to-clipboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard } from "@fortawesome/free-solid-svg-icons"

import styles from "./Latex.module.css"

const CopyButton = ({ buttonRef, text }) => (
  <CopyToClipboard text={text}>
    <button ref={buttonRef} className={styles.copyButton}>
      <FontAwesomeIcon icon={faClipboard} />
    </button>
  </CopyToClipboard>
)

export default CopyButton
