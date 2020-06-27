import React from "react"

import Latex from "react-latex"

import CopyButton from "./CopyButton"

import "katex/dist/katex.min.css"
import styles from "./Latex.module.css"

class Equation extends React.Component {
  constructor({ props, equation }) {
    super(props)
    this.equation = equation
  }

  render() {
    return (
      <div
        className={styles.equation}
        onMouseEnter={() => this.copyButton.style.visibility = `visible`}
        onMouseLeave={() => this.copyButton.style.visibility = `hidden`}
      >
        <CopyButton
          buttonRef={element => this.copyButton = element}
          text={this.equation}
        />
        <div className={styles.latex}>
          <Latex displayMode={true}>{`$$ ${this.equation} $$`}</Latex>
        </div>
      </div>
    )
  }
}

export default Equation
