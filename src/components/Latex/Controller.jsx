import React from "react"

import Latex from "react-latex"

import Data from "./Data"
import Viewport from "./Viewport"

import { calculate } from "../../util/request"

import "katex/dist/katex.min.css"
import styles from "./Latex.module.css"

class Controller extends React.Component {
  getCalculation(attr) {
    calculate({
      attr: attr,
      name: JSON.stringify(this.props.metric.name),
      variant: JSON.stringify(this.props.metric.variant)
    }).then(resp => this.props.onUpdate({key: attr, equations: resp}))
  }

  render() {
    if (!this.props.metric.metric) {
      return null
    }

    return (
      <Viewport
        className={styles.controller}
        width="300px"
      >
        <Data title="Coordinates">
          {this.props.metric.coordinate_type &&
          <p>{this.props.metric.coordinate_type}</p>
          }
          <Latex>
            {`$ (${this.props.metric.coordinates}) $`}
          </Latex>
        </Data>
        {this.props.metric.symmetry && this.props.metric.symmetry.length &&
        <Data title="Symmetry">
          <p>{this.props.metric.symmetry.join(", ")}</p>
        </Data>
        }
        {this.props.metric.references && this.props.metric.references.length &&
          <Data title="References">
            {this.props.metric.references.map(reference => <p>{reference}</p>)}
          </Data>
        }

        <hr />
        <Data title="Calculations">
          <button onClick={() => this.getCalculation("christoffel")}>
            Christoffel Symbols
          </button>
          <button onClick={() => this.getCalculation("riemann")}>
            Riemann Tensor
          </button>
          <button onClick={() => this.getCalculation("ricci_tensor")}>
            Ricci Tensor
          </button>
          <button onClick={() => this.getCalculation("ricci_scalar")}>
            Ricci Scalar
          </button>
          <button onClick={() => this.getCalculation("einstein")}>
            Einstein Tensor
          </button>
          <button onClick={() => this.getCalculation("weyl")}>
            Weyl Tensor
          </button>
        </Data>
      </Viewport>
    )
  }
}

export default Controller
