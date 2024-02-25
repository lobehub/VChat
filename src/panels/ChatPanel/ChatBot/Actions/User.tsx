import { ActionIconGroup, RenderAction, useChatListActionsBar } from '@lobehub/ui';
import { memo } from 'react';

const UserActionsBar: RenderAction = ({ onActionClick }) => {
  const { copy, divider, del, edit } = useChatListActionsBar({
    edit: '编辑',
    delete: '删除',
    regenerate: '重新生成',
    copy: '复制',
  });
  return (
    <ActionIconGroup
      dropdownMenu={[copy, divider, del]}
      items={[edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(UserActionsBar);
