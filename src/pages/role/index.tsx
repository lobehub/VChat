import { useAgentStore } from '@/store/role';
import { EmptyCard } from '@lobehub/ui';
const roleList = ['lilia', 'MimiMechanism'];

const Role = () => {
  const { setCurrentRole } = useAgentStore();
  return (
    <div style={{ padding: 24, width: '50%' }}>
      <div style={{ marginBottom: 12 }}>角色列表</div>
      {roleList.map((role) => {
        return (
          <EmptyCard
            key={role}
            width={200}
            cover={`https://raw.githubusercontent.com/v-idol/shell/master/src/${role}/model.png`}
            onClick={() => {
              setCurrentRole(
                `https://raw.githubusercontent.com/v-idol/shell/master/src/${role}/model.vrm`,
              );
            }}
            desc={'description'}
            title={role}
            style={{ marginBottom: 12 }}
          />
        );
      })}
    </div>
  );
};

export default Role;
