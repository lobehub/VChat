import { DanceStore, useDanceStore } from '@/store/dance';
import { Space } from 'antd';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

const controlSelectors = (s: DanceStore) => {
  return {
    isPlaying: s.isPlaying,
    setIsPlaying: s.setIsPlaying,
    prevDance: s.prevDance,
    nextDance: s.nextDance,
    togglePlayPause: s.togglePlayPause,
  };
};

const Control = () => {
  const { prevDance, nextDance, isPlaying, togglePlayPause } = useDanceStore(controlSelectors);

  return (
    <Space size={12} align="center">
      <SkipBack style={{ cursor: 'pointer' }} onClick={prevDance} size={16} />
      {isPlaying ? (
        <Pause style={{ cursor: 'pointer' }} onClick={togglePlayPause} size={20} />
      ) : (
        <Play style={{ cursor: 'pointer' }} onClick={togglePlayPause} size={20} />
      )}
      <SkipForward style={{ cursor: 'pointer' }} onClick={nextDance} size={16} />
    </Space>
  );
};

export default Control;
