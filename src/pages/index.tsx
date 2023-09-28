import Router from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    Router.push('/agent');
  }, []);

  return null;
};

export default Home;
