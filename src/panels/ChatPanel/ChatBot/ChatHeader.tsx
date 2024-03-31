import AgentMeta from '@/components/AgentMeta';
import { toogleVoice } from '@/services/chat';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import classNames from 'classnames';
import { Volume2 } from 'lucide-react';
import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);
  const [voiceOn] = useSessionStore((s) => [s.voiceOn]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <ActionIcon
        icon={Volume2}
        className={classNames(styles.voice, voiceOn && styles.voiceOn)}
        onClick={toogleVoice}
        title={voiceOn ? '关闭语音合成' : '开启语音合成'}
      />
    </div>
  );
};

export default Header;
