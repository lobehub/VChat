import Control from '@/app/desktop/Docker/AudioPlayer/Control';
import Duration from '@/app/desktop/Docker/AudioPlayer/Duration';
import Volume from '@/app/desktop/Docker/AudioPlayer/Volume';
import { DanceStore, useDanceStore } from '@/store/dance';
import { useViewerStore } from '@/store/viewer';
import { Avatar } from '@lobehub/ui';
import { Typography } from 'antd';
import classNames from 'classnames';
import { ListMusic } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
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
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { nextDance, currentPlay, isPlaying } = useDanceStore(danceSelectors);
  const viewer = useViewerStore((s) => s.viewer);

  const { styles } = useStyles();

  useEffect(() => {
    if (isPlaying && currentPlay) {
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
        <Avatar
          src={currentPlay?.cover}
          size={48}
          shape="circle"
          className={isPlaying ? styles.spin : ''}
        />
        <div className={styles.content}>
          <Duration duration={duration} currentProgress={currentProgress} />
          <div className={styles.controller}>
            <Typography.Text ellipsis={{ tooltip: currentPlay?.name }} className={styles.name}>
              {currentPlay?.name || '请从舞蹈列表中选取'}
            </Typography.Text>
            <Control />
            <div className={styles.right}>
              <Volume volume={volume} setVolume={setVolume} audioRef={ref} />
              <ListMusic style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Player);
