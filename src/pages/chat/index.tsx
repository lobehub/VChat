import AgentViewer from '@/components/AgentViewer';
import ChatBot from '@/components/ChatBot';
import { useSessionStore } from '@/store/session';
import { buildUrl } from '@/utils/buildUrl';
import { Button, Empty, Space } from 'antd';
import Router from 'next/router';

export default function Dance() {
  const { currentAgent, setCurrentAgent } = useSessionStore();
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flexBasis: '50%', flexShrink: 0 }}>
        <ChatBot />
      </div>
      <div style={{ flexBasis: '50%', flexShrink: 0 }}>
        {currentAgent ? (
          <AgentViewer />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={<span>未选择角色，请从角色列表中选择一个</span>}
            >
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    Router.push('/agent');
                  }}
                >
                  查看角色列表
                </Button>
                <Button
                  onClick={() => {
                    setCurrentAgent({
                      name: 'Sample_B',
                      cnName: 'Sample_B',
                      description: '默认角色 B',
                      homepage:
                        'https://hub.vroid.com/characters/8492290223992997626/models/1864405023120034389',
                      path: buildUrl('/AvatarSample_B.vrm'),
                      avatar: '',
                      cover: '',
                    });
                  }}
                >
                  使用默认角色
                </Button>
              </Space>
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
}
