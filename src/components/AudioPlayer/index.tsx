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
  const [tempVolume, setTempVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currrentProgress, setCurrrentProgress] = useState(0);

  const { currentDance, isPlaying, setIsPlaying } = useDanceStore();

  const { styles } = useStyles();

  useEffect(() => {
    if (isPlaying && currentDance) {
      ref.current && ref.current.play();
    } else {
      ref.current && ref.current.pause();
    }
  }, [isPlaying, currentDance]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    const formatted = [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':'); // format - mm:ss
    return formatted;
  }

  return (
    <div className={styles.container}>
      <audio
        src={currentDance?.audio}
        ref={ref}
        preload="metadata"
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onCanPlay={(e) => {
          e.currentTarget.volume = volume;
          setIsReady(true);
        }}
        onTimeUpdate={(e) => {
          setCurrrentProgress(e.currentTarget.currentTime);
        }}
      />
      <div className={styles.player}>
        <Avatar src={currentDance?.cover} size={96} shape="square" />
        <Flexbox vertical style={{ margin: '0px 12px', flexGrow: 1 }}>
          <div className={styles.top}>
            <div className={styles.name}>{currentDance?.name}</div>
            <div className={styles.control}>
              <SkipBack style={{ marginRight: 24, cursor: 'pointer' }} />
              {!isReady && currentDance ? (
                <Icon icon={Loader2} style={{ fontSize: 48, cursor: 'pointer' }} />
              ) : (
                <Icon
                  icon={isPlaying ? PauseCircle : PlayCircle}
                  style={{ fontSize: 48, cursor: 'pointer' }}
                  onClick={togglePlayPause}
                />
              )}
              <SkipForward style={{ marginLeft: 24, cursor: 'pointer' }} />
            </div>
            <div className={styles.volume} style={{ marginLeft: 12 }}>
              {volume === 0 ? (
                <VolumeXIcon onClick={() => setVolume(tempVolume)} />
              ) : (
                <Volume2
                  onClick={() => {
                    setTempVolume(volume);
                    setVolume(0);
                  }}
                />
              )}
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
          <Flexbox horizontal align="center">
            <span style={{ marginRight: 8 }}>{formatDurationDisplay(currrentProgress)}</span>
            <Slider
              min={0}
              max={duration}
              value={currrentProgress}
              tooltip={{ open: false }}
              style={{ width: '100%' }}
            />
            <span style={{ marginLeft: 8 }}>{formatDurationDisplay(duration)}</span>
          </Flexbox>
        </Flexbox>
      </div>
    </div>
  );
}

export default memo(Player);
