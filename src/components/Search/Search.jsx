import React from "react"

import { suggest } from "../../util/request"
import SearchBar from "./SearchBar"

import styles from "./Search.module.css"

export class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {suggestions: []}
  }

  render() {
    return (
      <div className={styles.search}>
        <SearchBar
          suggestions={this.state.suggestions}
          handleInput={
            input => suggest(input).then(resp =>
              this.setState({suggestions: resp})
            )
          }
        />
      </div>
    )
  }
}
