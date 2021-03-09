import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Search from "../components/Search"
import { Title, SubTitle } from "../components/Text"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100vh;
`

const IndexPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `
  )

  return (
    <Layout>
      <Container>
        <SEO title="Home" />
        <Title fontSize="5rem" style={{ marginBottom: "0.725rem" }}>
          {site.siteMetadata.title}
        </Title>
        <SubTitle fontSize="2.5rem">{site.siteMetadata.subtitle}</SubTitle>
        <Search />
      </Container>
    </Layout>
  )
}

export default IndexPage
