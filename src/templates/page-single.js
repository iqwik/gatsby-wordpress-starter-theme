import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SinglePage = ({ data: { page } }) => {
    const featuredImage = {
        fluid: page.featuredImage?.node?.localFile?.childImageSharp?.fluid,
        alt: page.featuredImage?.node?.alt || ``,
    }

    return (
        <Layout>
            <Seo title={page.title} description={page.excerpt} />

            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 itemProp="headline">{parse(page.title)}</h1>

                    <p>{page.date}</p>

                    {/* if we have a featured image for this post let's display it */}
                    {featuredImage?.fluid && (
                        <Image
                            fluid={featuredImage.fluid}
                            alt={featuredImage.alt}
                            style={{ marginBottom: 50 }}
                        />
                    )}
                </header>

                {!!page.content && (
                    <section itemProp="articleBody">{parse(page.content)}</section>
                )}

                <hr />

                <footer>
                    <Bio />
                </footer>
            </article>
        </Layout>
    )
}

export default SinglePage

export const pageQuery = graphql`
  query PageById($id: String!) {
    page: wpPage(id: { eq: $id }) {
      id
      content
      title
      date(formatString: "DD.MM.YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
