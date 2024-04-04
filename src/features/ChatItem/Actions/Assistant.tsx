import type { RenderAction } from '@/features/ChatItem/type';
import { ActionIconGroup, useChatListActionsBar } from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { Play } from 'lucide-react';
import { memo } from 'react';

const AssistantActionsBar: RenderAction = ({ onActionClick }) => {
  const { copy, regenerate, divider, del, edit } = useChatListActionsBar({
    edit: '编辑',
    delete: '删除',
    regenerate: '重新生成',
    copy: '复制',
  });

  const tts = {
    icon: Play,
    key: 'tts',
    label: '语音合成',
  } as ActionIconGroupItems;

  return (
    <ActionIconGroup
      dropdownMenu={[tts, regenerate, copy, divider, del]}
      items={[regenerate, edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(AssistantActionsBar);
