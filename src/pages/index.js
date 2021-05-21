import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
    <Layout>
        <Seo title="Home" />
        <h1>Hello World!</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <p>
            <Link to="/blog">Blog</Link><br/>
            <Link to="/pages">Pages</Link>
        </p>
    </Layout>
)

export default IndexPage
