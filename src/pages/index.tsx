import ChatBot from '@/components/ChatBot';
import VrmViewer from '@/components/VrmViewer';

export default function Home() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <VrmViewer />
      </div>
      <div style={{ flex: 1 }}>
        <ChatBot />
      </div>
    </div>
  );
}
