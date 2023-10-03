/* eslint-disable @next/next/no-img-element */
import { useDanceStore } from '@/store/dance';
import { DeleteOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Button, Drawer, List, Typography, theme } from 'antd';
import { PlayIcon, XIcon } from 'lucide-react';
import { memo } from 'react';

const { Text } = Typography;

const { Meta } = List.Item;

interface PlayListProps {
  open: boolean;
  onClose: () => void;
}

const PlayList = (props: PlayListProps) => {
  const { open = false, onClose } = props;
  const { token } = theme.useToken();
  const { playlist, playItem, removePlayItem, setPlayList, currentPlay } = useDanceStore();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={400}
      closeIcon={null}
      title="当前播放列表"
      headerStyle={{ padding: 12 }}
      extra={
        <Button size="small" icon={<DeleteOutlined />} onClick={() => setPlayList([])}>
          清空列表
        </Button>
      }
      bodyStyle={{ padding: 0 }}
    >
      <List
        size="small"
        dataSource={playlist}
        renderItem={(item) => {
          const mark = currentPlay ? currentPlay!.name === item.name : false;

          return (
            <List.Item
              actions={[
                <ActionIcon
                  icon={PlayIcon}
                  key="play"
                  onClick={() => playItem(item)}
                  size="small"
                />,
                <ActionIcon
                  icon={XIcon}
                  key="delete"
                  onClick={() => removePlayItem(item)}
                  size="small"
                />,
              ]}
              style={{
                cursor: 'pointer',
                backgroundColor: mark ? token.colorBgSpotlight : undefined,
              }}
              onDoubleClick={() => playItem(item)}
            >
              <Meta
                title={
                  <Text style={{ width: 600 }} ellipsis={{ tooltip: item.name }}>
                    {item.name}
                  </Text>
                }
              />
            </List.Item>
          );
        }}
      />
    </Drawer>
  );
};

export default memo(PlayList);
