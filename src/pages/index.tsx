import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === '/') {
      Router.push('/agent');
    }
  }, []);

  return null;
};

export default Home;
