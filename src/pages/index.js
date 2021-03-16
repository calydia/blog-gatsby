import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Layout from '../components/Layout';
import FrontBlogListing from '../components/styles/FrontBlogListing';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';

const FrontHeading = styled.h1`
  font-size: 2rem;
  line-height: 1.3;
  margin-top: 1.5em;
  text-align: center;
  @media only screen and (min-width: 940px) {
    font-size: 4rem;
    line-height: 1.2;
    margin-top: 1.2em;
  }
`;

const Home = ({ data }) => {
    const page = data.drupal.page;
    const newest = data.drupal.frontNewest;
    const listing = data.drupal.frontListing;

  return (
    <Layout>
      <main>
        <Helmet>
          <title>Welcome to my blog! | Blog - Sanna Mäkinen</title>
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
          <FrontHeading id="skip-target">
            { page.title }
          </FrontHeading>
          <FrontBlogListing>
          <ul className="blog-front-articles">
            {newest.items.map((node, index) => {
                  return (
                    <li key={`list-item${index}`} className="blog-list-item newest-blog">
                      <a key={index} className="post" href={node.slug}
                        aria-label={`${node.title} on ${dayjs(node.date).format(`MMMM DD, YYYY`)} | in category ${node.category}`}>
                        <GatsbyImage
                          image={getImage(node.listingImageFile)} alt=""
                        />
                        <div className="post-content" aria-hidden="true">
                          <span id={`first-blog-title${index}`} className="blog-listing-title">
                            {node.title}
                          </span>
                          <span className="visually-hidden">on</span>
                          <span className="blog-info">
                          {dayjs(node.date)
                              .format(`MMMM DD, YYYY`)}{' '}
                            | <span className="visually-hidden">in category</span> {node.category}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                }
              )
            }
            {listing.items.map((node, index) => {
                  return (
                    <li key={`list-item${index}`} className="blog-list-item">
                      <a key={index} className="post" href={node.slug}
                      aria-label={`${node.title} on ${dayjs(node.date).format(`MMMM DD, YYYY`)} | in category ${node.category}`}>
                        <GatsbyImage
                          image={getImage(node.listingImageFile)} alt=""
                        />
                        <div className="post-content" aria-hidden="true">
                          <span id={`blog-title${index}`} className="blog-listing-title">
                            {node.title}
                          </span>
                          <span className="visually-hidden">on</span>
                          <span className="blog-info">
                            {dayjs(node.date)
                              .format(`MMMM DD, YYYY`)}{' '}
                            | <span className="visually-hidden">in category</span> {node.category}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                }
              )
            }
            </ul>
        </FrontBlogListing>
      </main>
    </Layout>
  )
}

export default Home;


export const query = graphql`
  query GetFrontPage {
    drupal {
      page(id: 40) {
        title
        content
        metaDescription
      }
      frontNewest: articles(limit: 1) {
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
      frontListing: articles(limit: 100, offset: 1) {
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



