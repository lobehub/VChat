import { useSessionStore } from '@/store/session';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ScrollArcher = () => {
  const trackVisibility = useSessionStore((s) => !!s.chatLoadingId);
  const { ref, inView, entry } = useInView({
    delay: 100,
    trackVisibility,
  });

  useEffect(() => {
    if (!inView) {
      entry?.target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [inView, entry, trackVisibility]);

  return <div ref={ref} style={{ height: 1, width: '100%' }} />;
};

export default ScrollArcher;
