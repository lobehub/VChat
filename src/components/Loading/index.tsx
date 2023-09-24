import { Icon } from '@lobehub/ui';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

// eslint-disable-next-line react/display-name
const Loading = memo(() => {
  return (
    <Flexbox height={'100vh'} width={'100%'}>
      <Center flex={1} gap={12} width={'100%'}>
        <h1>Vidol.Chat</h1>
        <Center gap={16} horizontal>
          <Icon icon={Loader2} spin />
          应用初始化中
        </Center>
      </Center>
    </Flexbox>
  );
});

export default Loading;
