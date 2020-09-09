import React from "react"
import { StaticQuery, graphql } from "gatsby"

import styles from "./About.module.css"

const About = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            description
          }
        }
      }
    `}
    render={({ site }) => <p>{site.siteMetadata.description}</p>}
  />
)

export default About
