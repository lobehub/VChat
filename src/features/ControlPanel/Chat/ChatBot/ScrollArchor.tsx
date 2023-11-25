import { useSessionStore } from '@/store/session';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ScrollArchor = () => {
  const trackVisibility = useSessionStore((s) => !!s.chatLoadingId);
  const { ref, inView, entry } = useInView({
    delay: 100,
    trackVisibility,
  });

  useEffect(() => {
    if (!inView && trackVisibility) {
      entry?.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [inView, entry, trackVisibility]);

  return <div ref={ref} style={{ height: 1, width: '100%' }} />;
};

export default ScrollArchor;
