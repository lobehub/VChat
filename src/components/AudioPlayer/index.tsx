import { useDanceStore } from '@/store/dance';
import { Avatar, Icon } from '@lobehub/ui';
import { Slider } from 'antd';
import {
  Loader2,
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeXIcon,
} from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { useStyles } from './style';

function Player() {
  const ref = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [duration, setDuration] = useState(0);

  const { currentDance, isPlaying, setIsPlaying } = useDanceStore();

  const { styles } = useStyles();

  useEffect(() => {
    if (isPlaying && currentDance) {
      ref.current && ref.current.play();
    } else {
      ref.current && ref.current.pause();
    }
  }, [isPlaying, currentDance]);

  return (
    <div className={styles.player}>
      <audio
        src={currentDance?.audio}
        ref={ref}
        preload="metadata"
        onCanPlay={(e) => {
          e.currentTarget.volume = volume;
          setIsReady(true);
        }}
      />
      <Flexbox horizontal style={{ width: '100%' }}>
        <Avatar src={currentDance?.cover} size={96} shape="square" />
        <Flexbox vertical style={{ marginLeft: 12 }}>
          <Flexbox className={styles.top} horizontal distribution="between">
            <div className={styles.name}>{currentDance?.name}</div>
            <div className={styles.control}>
              <SkipBack style={{ marginRight: 24 }} />
              {!isReady && currentDance ? (
                <Icon icon={Loader2} style={{ fontSize: 48 }} />
              ) : isPlaying ? (
                <Icon
                  icon={PauseCircle}
                  style={{ fontSize: 48 }}
                  onClick={() => {
                    setIsPlaying(false);
                  }}
                />
              ) : (
                <PlayCircle
                  size={48}
                  onClick={() => {
                    setIsPlaying(true);
                  }}
                />
              )}
              <SkipForward style={{ marginLeft: 24 }} />
              <div className={styles.volume} style={{ marginLeft: 12 }}>
                {volume === 0 ? <VolumeXIcon /> : <Volume2 />}
                <Slider
                  min={0}
                  max={1}
                  tooltip={{ open: false }}
                  step={0.05}
                  style={{ width: 80, marginLeft: 12 }}
                  value={volume}
                  onChange={(volume) => {
                    if (!ref.current) return;
                    ref.current.volume = volume;
                    setVolume(volume);
                  }}
                />
              </div>
            </div>
          </Flexbox>
          <Flexbox>进度条</Flexbox>
        </Flexbox>
      </Flexbox>
    </div>
  );
}

export default memo(Player);
