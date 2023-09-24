import ChatBot from '@/components/ChatBot';

export default function Chat() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <ChatBot />
      </div>
    </div>
  );
}
