import { Slider } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

interface DurationProps {
  duration: number;
  currentProgress: number;
}

const Duration = (props: DurationProps) => {
  const { duration, currentProgress } = props;

  function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    return [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':');
  }

  return (
    <Flexbox horizontal align="center">
      <span style={{ marginRight: 8 }}>{formatDurationDisplay(currentProgress)}</span>
      <Slider
        min={0}
        max={duration}
        value={currentProgress}
        tooltip={{ open: false }}
        style={{ width: 180 }}
      />
      <span style={{ marginLeft: 8 }}>{formatDurationDisplay(duration)}</span>
    </Flexbox>
  );
};

export default memo(Duration);
