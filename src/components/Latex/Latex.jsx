import React from "react"

import Controller from "./Controller"
import EquationSet from "./EquationSet"

import styles from "./Latex.module.css"

export class Latex extends React.Component {
  constructor({props, metric}) {
    super(props)
    this.state = {key: "", equations: null}
    this.setState = this.setState.bind(this)
  }

  render() {
    return (
      <div className={styles.latexLayout}>
        <Controller metric={this.props.metric} onUpdate={this.setState} />
        <EquationSet
          type={this.state.key}
          equations={this.state.equations || this.props.metric.metric}
        />
      </div>
    )
  }
}
