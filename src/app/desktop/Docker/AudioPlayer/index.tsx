import Control from '@/app/desktop/Docker/AudioPlayer/Control';
import Duration from '@/app/desktop/Docker/AudioPlayer/Duration';
import { DanceStore, useDanceStore } from '@/store/dance';
import { useViewerStore } from '@/store/viewer';
import { Avatar } from '@lobehub/ui';
import { Slider, Typography } from 'antd';
import classNames from 'classnames';
import { ListMusic, Volume2, VolumeXIcon } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import PlayList from './PlayList';
import { useStyles } from './style';

interface PlayerProps {
  style?: React.CSSProperties;
  className?: string;
}

const danceSelectors = (s: DanceStore) => {
  return {
    isPlaying: s.isPlaying,
    nextDance: s.nextDance,
    currentPlay: s.currentPlay,
  };
};

function Player(props: PlayerProps) {
  const { style, className } = props;
  const ref = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.2);
  const [open, setOpen] = useState(false);
  const [tempVolume, setTempVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { nextDance, currentPlay, isPlaying } = useDanceStore(danceSelectors);
  const viewer = useViewerStore((s) => s.viewer);

  const { styles } = useStyles();

  useEffect(() => {
    if (!currentPlay) return;

    if (isPlaying) {
      fetch(currentPlay.src)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          viewer.model?.dance(buffer);
          ref.current && ref.current.play();
        });
    } else {
      viewer.model?.stopDance();
      ref.current && ref.current.pause();
      ref.current && (ref.current.currentTime = 0);
    }
  }, [isPlaying, currentPlay, viewer]);

  return (
    <div className={classNames(styles.container, className)} style={style}>
      <PlayList open={open} onClose={() => setOpen(false)} />
      <audio
        src={currentPlay?.audio}
        ref={ref}
        preload="metadata"
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onCanPlay={(e) => {
          e.currentTarget.volume = volume;
        }}
        onEnded={() => {
          viewer.model?.stopDance();
          nextDance();
        }}
        onTimeUpdate={(e) => {
          setCurrentProgress(e.currentTarget.currentTime);
        }}
      />
      <div className={styles.player}>
        <Flexbox>
          <Avatar src={currentPlay?.cover} size={64} shape="square" />
          <Typography.Text ellipsis={{ tooltip: currentPlay?.name }} className={styles.name}>
            {currentPlay?.name || '请从舞蹈列表中选取'}
          </Typography.Text>
        </Flexbox>
        <Flexbox style={{ margin: '0px 12px' }}>
          <Control />
          <Duration duration={duration} currentProgress={currentProgress} />
        </Flexbox>

        <div className={styles.right}>
          <ListMusic style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
          <div className={styles.volume} style={{ marginLeft: 18 }}>
            {volume === 0 ? (
              <VolumeXIcon style={{ cursor: 'pointer' }} onClick={() => setVolume(tempVolume)} />
            ) : (
              <Volume2
                style={{ cursor: 'pointer' }}
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
      </div>
    </div>
  );
}

export default memo(Player);
