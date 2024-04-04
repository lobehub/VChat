import { ActionIcon } from '@lobehub/ui';
import { Dropdown, MenuProps } from 'antd';
import { MoreVertical, Trash2 } from 'lucide-react';

interface ActionsProps {
  id: string;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { id, setOpen } = props;

  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: '删除对话',
      icon: <Trash2 />,
      danger: true,
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ domEvent }) => {
          domEvent.stopPropagation();
        },
      }}
      trigger={['click']}
      onOpenChange={(open) => setOpen(open)}
    >
      <ActionIcon
        icon={MoreVertical}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};
