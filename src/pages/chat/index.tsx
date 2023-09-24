import ChatBot from '@/components/ChatBot';
import VrmViewer from '@/components/VrmViewer';
import { useAgentStore } from '@/store/agent';
import { Button, Empty } from 'antd';

export default function Chat() {
  const { currentAgent } = useAgentStore();
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <ChatBot />
      </div>
      <div style={{ flex: 1 }}>
        {currentAgent ? (
          <VrmViewer />
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
              <span>
                Customize <a href="#API">Description</a>
              </span>
            }
          >
            <Button type="primary">Create Now</Button>
          </Empty>
        )}
      </div>
    </div>
  );
}
