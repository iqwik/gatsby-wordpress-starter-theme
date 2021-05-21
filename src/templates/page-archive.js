import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PageArchive = ({ data: { pages: { nodes: pages } } }) => {
    if (!pages.length) {
        return (
            <Layout isHomePage>
                <Seo title="All posts" />
                <Bio />
                <p>
                    No blog posts found. Add posts to your WordPress site and they'll
                    appear here!
                </p>
            </Layout>
        )
    }

    return (
        <Layout isHomePage>
            <Seo title="All pages" />

            <Bio />

            <ol style={{ listStyle: `none` }}>
                {pages.map(({ date, title, uri }) => (
                    <li key={uri}>
                        <article
                            className="post-list-item"
                            itemScope
                            itemType="http://schema.org/Article"
                        >
                            <header>
                                <h2>
                                    <Link to={decodeURIComponent(uri)} itemProp="url">
                                        <span itemProp="headline">{parse(title)}</span>
                                    </Link>
                                </h2>
                                <small>{date}</small>
                            </header>
                        </article>
                    </li>
                ))}
            </ol>
        </Layout>
    )
}

export default PageArchive

export const pageQuery = graphql`
  query PageArchive {
    pages: allWpPage(sort: { fields: [date], order: DESC }) {
      nodes {
        uri
        date(formatString: "DD.MM.YYYY")
        title
      }
    }
  }
`
