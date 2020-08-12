import React from "react"

import Select from "react-select"

import styles from "./Latex.module.css"

const VariationSelect = ({ defaultValue, variations, onChange }) => {
  if (!variations || !variations.length) {
    return null
  }

  const coordinate_sets = variations.reduce((acc, metric) => {
    acc[metric.coordinate_type] = [
      ...(acc[metric.coordinate_type] || []),
      metric,
    ]
    return acc
  }, {})

  const single_options = Object.entries(coordinate_sets)
    .filter(entry => entry[1].length === 1)
    .map(entry => ({ label: entry[0], value: entry[1][0] }))
  const group_options = Object.entries(coordinate_sets)
    .filter(entry => entry[1].length > 1)
    .map(entry => ({
      label: entry[0],
      options: entry[1].map(e => ({ label: e.notes || "TODO", value: e })),
    }))

  return (
    <Select
      className={styles.coordinateSelection}
      defaultValue={{
        label: defaultValue.coordinate_type,
        value: defaultValue,
      }}
      options={[...single_options, ...group_options]}
      isSearchable={false}
      onChange={e => onChange(e.value)}
    />
  )
}

export default VariationSelect
