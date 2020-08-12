import React, { useState, useEffect } from "react"

import { calculate } from "../../util/request"

import Controller from "./Controller"
import EquationSet from "./EquationSet"

import styles from "./Latex.module.css"

export const Latex = ({ data }) => {
  let [metric, setMetric] = useState(data.metric)
  let [calculation, setCalculation] = useState("metric")
  let [equations, setEquations] = useState(metric.metric)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    const requestCalculation = async () => {
      setLoading(true)
      setEquations(
        await calculate({
          attr: calculation,
          name: metric.name,
          variant: metric.variant,
        })
      )
      setLoading(false)
    }

    requestCalculation()
  }, [metric, calculation])

  return (
    <div className={styles.latexLayout}>
      <Controller
        metric={metric}
        variations={data.variations}
        setMetric={setMetric}
        setCalculation={setCalculation}
      />
      <EquationSet
        loading={loading}
        variant={metric.variant}
        type={calculation}
        equations={equations}
      />
    </div>
  )
}
