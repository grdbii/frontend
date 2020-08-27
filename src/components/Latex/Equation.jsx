import React from "react"

import Latex from "react-latex"

import CopyButton from "./CopyButton"

import "katex/dist/katex.min.css"
import styles from "./Latex.module.css"

const Equation = ({ equation }) => {
  let copyButton

  return (
    <div
      className={styles.equation}
      role="region"
      onMouseEnter={() => (copyButton.style.visibility = `visible`)}
      onMouseLeave={() => (copyButton.style.visibility = `hidden`)}
    >
      <CopyButton
        buttonRef={element => (copyButton = element)}
        text={equation}
      />
      <div className={styles.latex}>
        <Latex displayMode={true}>{`$$ ${equation} $$`}</Latex>
      </div>
    </div>
  )
}

export default Equation
