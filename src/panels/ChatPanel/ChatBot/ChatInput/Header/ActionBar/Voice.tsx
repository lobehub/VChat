import { toogleVoice } from '@/services/chat';
import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { EarIcon, EarOffIcon } from 'lucide-react';

const Voice = () => {
  const [voiceOn] = useSessionStore((s) => [s.voiceOn]);
  return (
    <ActionIcon
      icon={voiceOn ? EarIcon : EarOffIcon}
      onClick={toogleVoice}
      title={voiceOn ? '关闭语音合成' : '开启语音合成'}
    />
  );
};

export default Voice;
