require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Blog',
    author: 'Sanna Mäkinen',
    description: 'A blog about cats, life, and whatever comes to mind',
    siteUrl: 'https://blog.sanna.ninja',
    menuLinks: [
      {
        name: 'Cats',
        link: '/cats',
        id: 'menu-2',
      },
      {
        name: 'Life',
        link: '/life',
        id: 'menu-3',
      },
      {
        name: 'Games',
        link: '/games',
        id: 'menu-4',
      },
      {
        name: 'Tech',
        link: '/tech',
        id: 'menu-5',
      },
      {
        name: 'Accessibility',
        link: '/accessibility',
        id: 'menu-6',
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        "ssr": false
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/cats`, `/life`, `/tech`, `/games`, `/accessibility`],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icons: [
          {
            "src": "/icons/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/icons/apple-touch-icon.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icons/maskable.png",
            "sizes": "196x196",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
        name: `Blog - Sanna Mäkinen`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#BBC9F7`,
        display: `standalone`,
        orientation: `portrait`,
        lang: `eng`
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "DRUPAL",
        fieldName: "drupal",
        url: process.env.BACKEND_URL,
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, drupal } }) => {
              return drupal.articles.items.map((item) => {
                return Object.assign({}, {
                  description: item.metaDescription,
                  date: item.date,
                  url: site.siteMetadata.siteUrl + '/' + item.slug,
                  guid: site.siteMetadata.siteUrl + '/' + item.slug,
                });
              });
            },
            query: `
            {
              drupal {
                articles {
                  items {
                    title
                    slug
                    date
                    metaDescription
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: "Blog - Sanna Mäkinen's RSS Feed",
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['/icons*']
        }
      }
    }
  ],
};
