import React from "react"
import { StaticQuery, graphql } from "gatsby"

import PrimaryTitle from "./PrimaryTitle"
import SecondaryTitle from "./SecondaryTitle"

export const Title = ({ primary, section }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={({ site }) =>
      primary ? (
        <PrimaryTitle
          title={site.siteMetadata.title}
          subtitle={site.siteMetadata.subtitle}
        />
      ) : (
        <SecondaryTitle title={site.siteMetadata.title} section={section} />
      )
    }
  />
)
