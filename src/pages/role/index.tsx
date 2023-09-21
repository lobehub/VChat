import { useAgentStore } from '@/store/role';
import { EmptyCard } from '@lobehub/ui';
const roleList = ['AvatarSample_B', 'qiqi'];

const Role = () => {
  const { setCurrentRole } = useAgentStore();
  return (
    <div style={{ padding: 24, width: '50%' }}>
      <div>角色列表</div>
      {roleList.map((role) => {
        return (
          <EmptyCard
            key={role}
            cover={
              'https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/convenience-store.webp'
            }
            onClick={() => {
              setCurrentRole(role);
            }}
            desc={'description'}
            title={role}
          />
        );
      })}
    </div>
  );
};

export default Role;
