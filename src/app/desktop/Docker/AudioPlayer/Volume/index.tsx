import { Slider } from 'antd';
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
      <div style={{ marginRight: 8 }}>
        {volume === 0 ? (
          <VolumeXIcon
            style={{ cursor: 'pointer', fontSize: 16 }}
            onClick={() => setVolume(tempVolume)}
          />
        ) : (
          <Volume2
            style={{ cursor: 'pointer', fontSize: 16 }}
            onClick={() => {
              setTempVolume(volume);
              setVolume(0);
            }}
          />
        )}
      </div>
      <Slider
        min={0}
        max={1}
        tooltip={{ open: false }}
        step={0.05}
        style={{ width: 80, margin: 0 }}
        value={volume}
        onChange={(volume) => {
          if (!audioRef.current) return;
          audioRef.current.volume = volume;
          setVolume(volume);
        }}
      />
    </div>
  );
};

export default memo(Volume);
