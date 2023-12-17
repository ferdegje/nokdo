/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Nos Cadeaux`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [],
}
