import ChatBot from '@/components/ChatBot';

export default function Chat() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flexBasis: '50%', flexShrink: 0 }}>
        <ChatBot />
      </div>
    </div>
  );
}
