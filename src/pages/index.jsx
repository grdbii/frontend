import React from "react"

import Layout from "../components/Layout"
import About from "../components/About"
import SEO from "../components/SEO"
import { Title } from "../components/Title"
import { Search } from "../components/Search"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Title primary />
    <Search />
    <About />
  </Layout>
)

export default IndexPage
