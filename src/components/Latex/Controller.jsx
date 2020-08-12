import React from "react"

import Latex from "react-latex"

import Data from "./Data"
import VariationSelect from "./VariationSelect"
import Viewport from "./Viewport"

import "katex/dist/katex.min.css"
import styles from "./Latex.module.css"

const Controller = ({ metric, variations, setMetric, setCalculation }) => {
  const DataList = ({ title, list, apply = x => x }) =>
    list && list.length ? <Data title={title}>{apply(list)}</Data> : null

  const Button = ({ name, calculation }) => (
    <button onClick={() => setCalculation(calculation)}>{name}</button>
  )

  return (
    <Viewport className={styles.controller} width="300px">
      <Data title="Coordinates">
        <VariationSelect
          defaultValue={metric}
          variations={variations}
          onChange={setMetric}
        />
        <Latex>{`$ (${metric.coordinates}) $`}</Latex>
      </Data>

      <DataList
        title="Symmetry"
        list={metric.symmetry}
        apply={sym => <p>{sym.join(", ")}</p>}
      />

      <DataList
        title="References"
        list={metric.references}
        apply={refs => refs.map((ref, index) => <p key={index}>{ref}</p>)}
      />

      <hr />

      <Data title="Display">
        {[
          ["Metric", "metric"],
          ["Christoffel Symbols", "christoffel"],
          ["Riemann Tensor", "riemann"],
          ["Ricci Tensor", "ricci_tensor"],
          ["Ricci Scalar", "ricci_scalar"],
          ["Einstein Tensor", "einstein"],
          ["Weyl Tensor", "weyl"],
        ].map((info, index) => (
          <Button key={index} name={info[0]} calculation={info[1]} />
        ))}
      </Data>
    </Viewport>
  )
}

export default Controller
