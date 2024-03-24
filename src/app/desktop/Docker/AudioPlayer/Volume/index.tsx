import { ConfigProvider, Slider } from 'antd';
import { Volume2, VolumeXIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { useStyles } from './style';

interface VolumeProps {
  volume: number;
  setVolume: (volume: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Volume = (props: VolumeProps) => {
  const { volume, setVolume, audioRef } = props;
  const [tempVolume, setTempVolume] = useState(0);
  const { styles } = useStyles();

  return (
    <div className={styles.volume}>
      {volume === 0 ? (
        <VolumeXIcon
          className={styles.volumeIcon}
          onClick={() => setVolume(tempVolume)}
          size={20}
        />
      ) : (
        <Volume2
          className={styles.volumeIcon}
          size={20}
          onClick={() => {
            setTempVolume(volume);
            setVolume(0);
          }}
        />
      )}
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
          max={1}
          tooltip={{ open: false }}
          step={0.05}
          style={{ width: 64, margin: 0 }}
          value={volume}
          onChange={(volume) => {
            if (!audioRef.current) return;
            audioRef.current.volume = volume;
            setVolume(volume);
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default memo(Volume);
