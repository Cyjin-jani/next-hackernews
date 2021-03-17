import fetch from 'isomorphic-fetch';
import React from 'react';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';

class Index extends React.Component {

  static async getInitialProps() {
    let stories;

    try{
      const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=30');
      // const response = await fetch('https://node-hnapi.herokuapp.com/n');
      stories = await response.json();
    }catch(err) {
      // console.log(err);
      stories = [];
    }
    
    // console.log(stories);
    return { stories };

  }

  render() {

    const { stories: { hits } } = this.props;

    if (hits.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout title="Hacker Next" description="A Hacker News clone made of nextjs">
        <StoryList stories={hits} />
      </Layout>
    )
  }
}

export default Index;