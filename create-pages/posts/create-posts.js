const { slash } = require( `gatsby-core-utils` )
const chunk = require(`lodash/chunk`)
const getPosts = require(`./queries/get-posts`)
const getWpSettingsPostsPerPage = require(`./queries/get-wp-settings-posts-per-page`)

const singlePostTemplate = require.resolve(`../../src/templates/post-single.js`)
const postArchiveTemplate = require.resolve(`../../src/templates/post-archive.js`)

module.exports = async gatsbyUtilities => {
    const posts = await getPosts(gatsbyUtilities)
    if (!posts.length) {
        return
    }
    await createPostArchive({ posts, gatsbyUtilities })
    await createSinglePostPages({ posts, gatsbyUtilities })
}

const createPostArchive = async ({ posts, gatsbyUtilities }) => {
    const postsPerPage = await getWpSettingsPostsPerPage(gatsbyUtilities)

    const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
    const totalPages = postsChunkedIntoArchivePages.length

    return Promise.all(
        postsChunkedIntoArchivePages.map(async (_posts, index) => {
            const pageNumber = index + 1

            const getPagePath = page => {
                if (page > 0 && page <= totalPages) {
                    // we wanna get the first page to be "/blog" and any additional pages
                    // should be numbered => "/blog/2" for example
                    return page === 1 ? `/blog` : `/blog/${page}`
                }

                return null
            }

            await gatsbyUtilities.actions.createPage({
                path: getPagePath(pageNumber),
                component: slash(postArchiveTemplate),
                context: {
                    offset: index * postsPerPage,
                    postsPerPage,
                    nextPagePath: getPagePath(pageNumber + 1),
                    previousPagePath: getPagePath(pageNumber - 1),
                },
            })
        })
    )
}

const createSinglePostPages = async ({ posts, gatsbyUtilities }) =>
    Promise.all(
        posts.map(({ previous, post, next }) => {
            return gatsbyUtilities.actions.createPage({
                path: `/blog/${decodeURIComponent(post.slug)}`,
                component: slash(singlePostTemplate),
                context: {
                    id: post.id,
                    previousPostId: previous ? previous.id : null,
                    nextPostId: next ? next.id : null,
                },
            })
        })
    )
