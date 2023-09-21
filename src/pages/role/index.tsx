const roleList = ['sample'];

const Config = () => {
  return (
    <div style={{ padding: 24, width: '50%' }}>
      <div>角色列表</div>
      {roleList.map((role) => {
        return <div key={role}>{role}</div>;
      })}
    </div>
  );
};

export default Config;
