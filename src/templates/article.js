import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';

const BlogWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  max-width: 1564px;
  padding: 0;
  width: 100%;
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 280px;
    grid-gap: 0 30px;
    padding: 0 2em;
  }
  .blog-main-image-wrapper {
    @media only screen and (min-width: 768px) {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`;

const BlogMainContent = styled.div`
  background: transparent;
  color: ${({ theme }) => theme.postText};
  font-size: 1.4rem;
  line-height: 1.5;
  padding: 0.5em 1.5em;
  max-width: 1000px;
  width: 100%;
  @media only screen and (min-width: 1000px) {
    font-size: 1.4rem;
    line-height: 1.5;
    padding: 1.5em 2em;
  }
  .blog-info {
    font-size: 1.2rem;
  }
  h1 {
    font-size: 1.8rem;
    line-height: 1.3;
    margin-bottom: 0.2em;
    @media only screen and (min-width: 1000px) {
      font-size: 2.2rem;
      line-height: 1.2;
    }
  }
  h2 {
    font-size: 1.7rem;
    line-height: 1.2;
    @media only screen and (min-width: 1000px) {
      font-size: 2rem;
      line-height: 1.3;
    }
  }
  a {
    color: ${({ theme }) => theme.postLink};
    text-decoration: underline;
    &:focus,
    &:hover {
      color: ${({ theme }) => theme.postLinkHover};
      outline: 1px solid ${({ theme }) => theme.postLinkHover};
      outline-offset: 2px;
      text-decoration: none;
    }
    &:focus {
      outline: 3px dashed ${({ theme }) => theme.postLinkHover};
      outline-offset: 0;
    }
  }
  .image-credits {
    margin-top: 2em;
    p {
      font-size: 1rem;
    }
  }
`;

const BlogWriterContent = styled.div`
  color: ${({ theme }) => theme.postText};
  margin-top: 145px;
  width: 100%;
  @media only screen and (min-width: 1000px) {
    width: 280px;
  }
  .writer-image-wrapper {
    height: 150px;
    margin-bottom: 25px;
    margin-top: -105px;
    width: 150px;
  }
  .info-content {
    font-size: 1.125rem;
    background: ${({ theme }) => theme.writerBg};
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 2em;
    text-align: center;
  }
  p {
    font-size: 1.2rem;
  }
  .name {
    font-family: 'Rock Salt', cursive;
    font-size: 1.2rem;
    font-weight: normal;
    text-align: center;
    width: 100%;
    @media only screen and (min-width: 1000px) {
      width: auto;
    }
  }
`;

const BlogPost = ({ data }) => {
  const post = data.drupal.articleSlug;

  const mainImage = getImage(post.mainImageFile);
  const authorImage = getImage(post.authorImageFile);

  return (
    <Layout>
      <main>
        <Helmet>
          <title>{post.title} | Blog - Sanna Mäkinen</title>
          <meta name="Description" content={post.metaDescription} />
          <meta
            property="og:description"
            content={post.metaDescription}
          />
          <meta property="og:title" content={post.title} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en" />
          <meta property="og:site_name" content="Blog - Sanna Mäkinen" />
          <meta property="og:image" content={post.mainImage} />
        </Helmet>
        <BlogWrapper>
          <div className="blog-main-image-wrapper">
            <GatsbyImage
              image={mainImage} alt=""
            />
          </div>
          <BlogMainContent>
            <h1 id="skip-target">{ post.title }</h1>
            <span className="blog-info">
              {dayjs(post.date).format(`MMMM DD, YYYY`)}{' '}
              | {post.category}
            </span>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="image-credits" dangerouslySetInnerHTML={{ __html: post.imageCredits }}></div>
          </BlogMainContent>
          <BlogWriterContent>
            <article className="info-box">
              <div className="info-content">
                <div className="writer-image-wrapper">
                  <GatsbyImage
                    image={authorImage} alt=""
                  />
                </div>
                <span className="name">{ post.authorName }</span>
                <div dangerouslySetInnerHTML={{ __html: post.authorContent }}></div>
              </div>
            </article>
          </BlogWriterContent>
        </BlogWrapper>
      </main>
    </Layout>
  );
}

export default BlogPost;

export const query = graphql`
  query GetBlog($slug: String!) {
    drupal {
      articleSlug(slug: $slug) {
        title
        authorContent
        authorImage
        authorImageFile {
          childImageSharp {
            gatsbyImageData(
              width: 150
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        authorName
        category
        content
        date
        id
        imageCredits
        slug
        published
        mainImage
        mainImageFile {
          childImageSharp {
            gatsbyImageData(
              width: 1500
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        metaDescription
      }
    }
  }
`;

