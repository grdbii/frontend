module.exports = {
  siteMetadata: {
    title: `GRDBII`,
    subtitle: `The General Relativity Database II`,
    description: `The General Relativity Database of Exact Solutions to Einstein's Field Equations`,
    author: `@cjayross`,
    backend_url: `http://localhost:4000`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `util`,
        path: `${__dirname}/src/util`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
