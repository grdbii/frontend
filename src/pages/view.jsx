import React from "react"

import { parse } from "query-string"

import { retrieve } from "../util/request"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Title } from "../components/Title"
import { Search } from "../components/Search"
import { Latex } from "../components/Latex"

class ViewPage extends React.Component {
  constructor({ props, location }) {
    super(props)
    let key = parse(location.search)["m"]
    this.state = {name: "", metric: null}
    this.fetch = retrieve(key)
  }

  componentDidMount() {
    this.fetch.then(resp => this.setState(resp))
  }

  render() {
    return (
      <Layout>
        <SEO title="View" />
        <Title section={this.state.name} />
        <Search />
        <Latex metric={this.state} />
      </Layout>
    )
  }
}

export default ViewPage
