import React from "react"

import Equation from "./Equation"
import Viewport from "./Viewport"

import styles from "./Latex.module.css"

const EquationSet = ({ loading, variant, type, equations }) => {
  if (loading) {
    return (
      <Viewport className={styles.equationSet} width="960px">
        Loading...
      </Viewport>
    )
  }

  const fontSize = 100 * (1 + 0.6 / (1 + Math.exp(equations.length - 4)))
  const latex = Array.isArray(equations) ? (
    equations.map((equation, index) => (
      <Equation key={`${variant}:${type}:${index}`} equation={equation} />
    ))
  ) : (
    <Equation equation={equations} />
  )
  return (
    <Viewport className={styles.equationSet} fontSize={fontSize} width="960px">
      {latex}
    </Viewport>
  )
}

export default EquationSet
