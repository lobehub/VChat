import { ConfigProvider, Slider } from 'antd';
import { memo } from 'react';
import { useStyles } from './style';

interface DurationProps {
  duration: number;
  currentProgress: number;
}

const Duration = (props: DurationProps) => {
  const { duration, currentProgress } = props;
  const { styles } = useStyles();

  function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    return [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':');
  }

  return (
    <div className={styles.duration}>
      <span style={{ marginRight: 8 }} className={styles.counter}>
        {formatDurationDisplay(currentProgress)}
      </span>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              controlSize: 6,
              handleSize: 6,
            },
          },
        }}
      >
        <Slider
          min={0}
          max={duration}
          value={currentProgress}
          tooltip={{ open: false }}
          style={{ width: '100%', margin: 0 }}
        />
      </ConfigProvider>
      <span style={{ marginLeft: 8 }} className={styles.counter}>
        {formatDurationDisplay(duration)}
      </span>
    </div>
  );
};

export default memo(Duration);
