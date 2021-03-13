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
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
        name: `Blog - Sanna Mäkinen`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#BBC9F7`,
        display: `standalone`,
        "orientation": "portrait"
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
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['/icons*']
        }
      }
    }
  ],
};
