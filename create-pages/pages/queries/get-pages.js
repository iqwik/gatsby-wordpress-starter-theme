const WpPages = `
query WpPages {
  allWpPage(sort: {order: DESC, fields: ancestors___nodes___date}) {
    edges {
      node {
        id
        uri
      }
    }
  }
}
`

module.exports = async ({ graphql, reporter }) => {
    const graphqlResult = await graphql(WpPages)

    if (graphqlResult.errors) {
        reporter.panicOnBuild(
            `There was an error loading your pages`,
            graphqlResult.errors
        )
        return
    }

    return graphqlResult.data.allWpPage.edges
}
