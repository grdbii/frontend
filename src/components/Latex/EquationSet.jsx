import React from "react"

import Equation from "./Equation"
import Viewport from "./Viewport"

import styles from "./Latex.module.css"

const EquationSet = ({ type, equations }) => {
  if (!equations || !equations.length) {
    return null
  }

  let fontSize = 100 * (1 + 0.6 / (1 + Math.exp(equations.length - 4)))
  let latex = Array.isArray(equations)
    ? equations.map((equation, index) => <Equation key={`${type}${index}`} equation={equation} />)
    : <Equation equation={equations} />
  return (
    <Viewport
      className={styles.equationSet}
      fontSize={fontSize}
      width="960px"
    >
      {latex}
    </Viewport>
  )
}

export default EquationSet
