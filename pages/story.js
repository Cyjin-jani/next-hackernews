import React from 'react';
import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Layout from '../components/Layout';

import CommentList from '../components/CommentList';


class Story extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let story;
    try {
      const storyId = query.id;
      const response = await fetch(`http://hn.algolia.com/api/v1/items/${storyId}`); 
      story = await response.json();
    } catch(err) {
      console.log(err);
      story = null;
    }
    
    return { story };
  }


  render() {
    const { story } = this.props;
    if (!story) {
      return <Error statusCode="503" />
    }
    return <Layout title={story.title} backButton={true}>
        <main>
          <h1 className="story-title"><a href={story.url}>{story.title}</a></h1>
          <div className="story-details">
            <strong>{story.points} points </strong>
            <strong>{story.children.length}comments </strong>
            <strong>created_at: {story.created_at}</strong>
          </div>

          {story.children.length > 0 ? (
            <CommentList comments={story.children} />
          ) : (
            <div>No comments for this story</div>
          )}
        </main>
        <style jsx>{`
          main {
            padding: 1em;
          }
          .story-title {
            font-size: 1.2rem;
            margin: 0;
            font-weight: 300;
            padding-bottom: 0.5em;
          }
          .story-title a {
            color: #333;
            text-decoration: none;
          }
          .story-title a:hover {
            text-decoration: underline;
          }
          .story-details {
            font-size: 0.8rem;
            padding-bottom: 1em;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            margin-bottom: 1em;
          }
          .story-details strong {
            margin-right: 1em;

          }
          .story-details a {
            color: #f60;
          }

        `}</style>

       </Layout>
  }
}

export default Story;