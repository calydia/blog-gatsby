const path = require(`path`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/article.js`);
  
  const result = await graphql(`
  query {
    drupal {
      articles {
        items {
          slug
        }
      }
    }
  }
  `)
  result.data.drupal.articles.items.forEach(edge => {
    createPage({
      path: `${edge.slug}`,
      component: blogPostTemplate,
      context: {
        slug: edge.slug,
      },
    })
  })
}

exports.createResolvers = ({actions,cache,createNodeId,createResolvers,store,reporter,}) => {
  const { createNode } = actions
  createResolvers({
    DRUPAL_Article: {
      mainImageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.mainImage,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
      listingImageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.listingImage,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
      authorImageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.authorImage,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}