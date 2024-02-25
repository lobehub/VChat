import { useSessionStore } from '@/store/session';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ScrollArcher = () => {
  const trackVisibility = useSessionStore((s) => !!s.chatLoadingId);
  const { ref, inView, entry } = useInView({
    root: document.getElementById('chat-list'),
    // trackVisibility 会影响性能，需要配合一个至少 100 的 delay
    delay: 100,
    trackVisibility,
  });

  useEffect(() => {
    if (!inView) {
      entry?.target.scrollIntoView();
    }
  }, [inView, entry]);

  return <div ref={ref} style={{ height: 1, width: '100%' }} />;
};

export default ScrollArcher;
