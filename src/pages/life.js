import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';
import Layout from '../components/Layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import BlogListing from '../components/styles/BlogListing';
import BlogCategoryContent from '../components/styles/BlogCategoryContent';
import { Helmet } from 'react-helmet';

const LifeListing = ({ data }) => {
  const page = data.drupal.page;
  const newest = data.drupal.lifeNewest;
  const listing = data.drupal.lifeListing;

  return (
    <Layout>
      <main>
        <Helmet>
          <title>Life | Blog - Sanna Mäkinen</title>
          <meta name="Description" content={page.metaDescription} />
          <meta
            property="og:description"
            content={page.metaDescription}
          />
          <meta property="og:title" content={ page.title } />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en" />
          <meta property="og:site_name" content="Blog - Sanna Mäkinen" />
          <meta property="og:image" content="https://blog.sanna.ninja/images/osiris.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Helmet>
        <BlogCategoryContent>
          <h1 id="skip-target">{ page.title }</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
        </BlogCategoryContent>
        <BlogListing>
          <ul className="blog-category-articles">
            {newest.items.map((node, index) => {
              return (
                <li key={`list-item${index}`} className="blog-list-item newest-blog">
                  <a key={index} className="post" href={`/${node.slug}`} >
                    <GatsbyImage
                      image={getImage(node.listingImageFile)} alt=""
                    />
                    <div className="post-content">
                      <span className="blog-listing-title">
                        {node.title}
                      </span>
                      <span className="visually-hidden">on</span>
                      <span className="blog-info">
                      {dayjs(node.date)
                          .format(`MMMM DD, YYYY`)}{' '}
                        <span aria-hidden="true">|</span> <span className="visually-hidden">in category</span> {node.category}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
            {listing.items.map((node, index) => {
              return (
                <li key={`list-item${index}`} className="blog-list-item">
                  <a key={index} className="post" href={`/${node.slug}`}>
                    <GatsbyImage
                      image={getImage(node.listingImageFile)} alt=""
                    />
                    <div className="post-content">
                      <span className="blog-listing-title">
                        {node.title}
                      </span>
                      <span className="visually-hidden">on</span>
                      <span className="blog-info">
                      {dayjs(node.date)
                          .format(`MMMM DD, YYYY`)}{' '}
                        <span aria-hidden="true">|</span> <span className="visually-hidden">in category</span> {node.category}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </BlogListing>
      </main>
    </Layout>
  );
}

export default LifeListing;

export const query = graphql`
  query GetLifeListingPage {
    drupal {
      page(id: 42) {
        title
        content
        metaDescription
      }
      lifeNewest: articles(limit: 1, category: 4) {
        items {
          title
          slug
          date
          listingImage
          listingImageFile {
            childImageSharp {
              gatsbyImageData(
                width: 1025
                height: 600
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          category
        }
      }
      lifeListing: articles(limit: 100, category: 4, offset: 1) {
        items {
          title
          slug
          date
          listingImage
          listingImageFile {
            childImageSharp {
              gatsbyImageData(
                width: 1025
                height: 600
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          category
        }
      }
    }
  }
`;



