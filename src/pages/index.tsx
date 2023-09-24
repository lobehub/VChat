import Loading from '@/components/Loading';
import Router from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    Router.push('/agent');
  }, []);

  return <Loading />;
};

export default Home;
