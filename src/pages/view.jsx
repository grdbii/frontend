import React, { useState, useEffect } from "react"

import { parse } from "query-string"

import { retrieve, search } from "../util/request"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Title } from "../components/Title"
import { Search } from "../components/Search"
import { Latex } from "../components/Latex"

const ViewPage = ({ location }) => {
  const [metric, setMetric] = useState()
  const [variations, setVariations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setMetric(await retrieve(parse(location.search)["m"]))
    }
    fetchData()
  }, [location])

  useEffect(() => {
    const fetchData = async () => {
      setVariations(
        await search({ name: metric.name }).then(resp =>
          resp.filter(variant => variant.name === metric.name)
        )
      )
    }
    metric && fetchData()
  }, [metric])

  return (
    <Layout>
      <SEO title="View" />
      <Title section={metric ? metric.name : ""} />
      <Search />
      {metric && <Latex data={{ metric: metric, variations: variations }} />}
    </Layout>
  )
}

export default ViewPage
