import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, useStaticQuery, graphql } from "gatsby"
import { parse } from "query-string"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Search from "../components/Search"
import Latex from "../components/Latex"
import { Title, SubTitle } from "../components/Text"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;

  > *:not(:first-child) {
    margin-top: 5rem;
  }
`

const TitleContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 3rem;
`

const ViewPage = props => {
  const [metric, setMetric] = useState(null)
  const [variations, setVariations] = useState(null)

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const id = parse(props.location.search)["id"]

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:4001/metric?id=${id}`)
      setMetric(result.data)
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:4001/variants?name=${metric.name}`
      )
      setVariations(result.data)
    }

    metric && fetchData()
  }, [metric])

  return (
    <Layout>
      <SEO title="View" />
      <TitleContainer>
        <Link to="/">
          <Title fontSize="4rem">{site.siteMetadata.title}</Title>
        </Link>
        <SubTitle fontSize="2.5rem">{metric ? metric.name : ""}</SubTitle>
      </TitleContainer>
      <Container>
        <Search />
        {metric && variations && (
          <Latex metric={metric} variations={variations} />
        )}
      </Container>
    </Layout>
  )
}

export default ViewPage
