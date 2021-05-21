const wpSettings = `
query wpSettings {
  wp {
    readingSettings {
      postsPerPage
    }
  }
}
`

module.exports = async ({ graphql, reporter }) => {
    const graphqlResult = await graphql(wpSettings)

    if (graphqlResult.errors) {
        reporter.panicOnBuild(
    `There was an error loading your pages`,
            graphqlResult.errors
        )
        return
}

  return graphqlResult.data.wp.readingSettings.postsPerPage
}
