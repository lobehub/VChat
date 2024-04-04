import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MoreVertical, Trash2 } from 'lucide-react';

interface ActionsProps {
  id: string;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { id, setOpen } = props;
  const { modal } = App.useApp();
  const [removeSession] = useSessionStore((s) => [s.removeSession]);

  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: '删除对话',
      icon: <Trash2 />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          onOk: () => {
            removeSession(id);
          },
          title: '确认删除对话吗？删除后无法恢复, 请谨慎操作！',
        });
      },
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
