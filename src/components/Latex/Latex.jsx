import React, { useState, useEffect } from "react"

import { calculate } from "../../util/request"

import Controller from "./Controller"
import EquationSet from "./EquationSet"

import styles from "./Latex.module.css"

export const Latex = ({ data }) => {
  const [metric, setMetric] = useState(data.metric)
  const [calculation, setCalculation] = useState("metric")
  const [equations, setEquations] = useState(metric.metric)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!loading) {
      return
    }

    const fetchData = async () => {
      setEquations(await calculate({ id: metric.id, attr: calculation }))
      setLoading(false)
    }

    if (metric[calculation] && metric[calculation].length !== 0) {
      setEquations(metric[calculation])
      setLoading(false)
    } else {
      fetchData()
    }
  }, [loading, metric, calculation])

  return (
    <div className={styles.latexLayout}>
      <Controller
        metric={metric}
        variations={data.variations}
        calculation={calculation}
        setMetric={setMetric}
        setCalculation={setCalculation}
        setLoading={setLoading}
      />
      <EquationSet
        loading={loading}
        id={metric.id}
        type={calculation}
        equations={equations}
      />
    </div>
  )
}
