import fetch from 'isomorphic-fetch';
import React from 'react';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import Link from 'next/link';

class Index extends React.Component {

  static async getInitialProps({req, res, query }) {
    let stories;
    // console.log(query); // { page: '2' }
    let page;

    try{
      page = Number(query.page) || 1; //or연산자 통해서 page가 없으면 1페이지로.
      const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
      
      stories = await response.json();
    }catch(err) {
      // console.log(err);
      stories = [];
    }
    
    // console.log(stories);
    return { page, stories };

  }

  render() {

    const { page, stories: { hits } } = this.props;
    // console.log('page', page);
    if (hits.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout title="Hacker Next" description="A Hacker News clone made of nextjs">
        <StoryList stories={hits} />

        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>

        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index;