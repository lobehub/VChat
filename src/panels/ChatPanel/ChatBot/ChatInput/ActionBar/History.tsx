import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { Eraser } from 'lucide-react';

const History = () => {
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);
  return (
    <Popconfirm
      title="确定删除历史消息？"
      description="该操作不可逆，请谨慎操作"
      onConfirm={clearHistory}
      okText="确定"
      cancelText="取消"
    >
      <ActionIcon icon={Eraser} title="删除历史消息" />
    </Popconfirm>
  );
};

export default History;
