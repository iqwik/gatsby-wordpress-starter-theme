const WpPosts = `
query WpPosts {
  # Query all WordPress blog posts sorted by date
  allWpPost(sort: { fields: [date], order: DESC }) {
    edges {
      previous {
        id
      }

      # note: this is a GraphQL alias. It renames "node" to "post" for this query
      # We're doing this because this "node" is a post! It makes our code more readable further down the line.
      post: node {
        id
        slug
        uri
      }

      next {
        id
      }
    }
  }
}
`

module.exports = async ({ graphql, reporter }) => {
    const graphqlResult = await graphql(WpPosts)

    if (graphqlResult.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            graphqlResult.errors
        )
        return
    }

    return graphqlResult.data.allWpPost.edges
}
