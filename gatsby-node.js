const createAllPosts = require(`./create-pages/posts/create-posts`)
const createAllPages = require(`./create-pages/pages/create-pages`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

exports.createPages = async gatsbyUtilities => {
    await createAllPosts(gatsbyUtilities)
    await createAllPages(gatsbyUtilities)
}
