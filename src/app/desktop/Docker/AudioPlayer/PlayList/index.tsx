/* eslint-disable @next/next/no-img-element */
import { DanceStore, useDanceStore } from '@/store/dance';
import { DeleteOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Button, Drawer, List, Typography, theme } from 'antd';
import { Pause, PlayIcon, XIcon } from 'lucide-react';
import { memo } from 'react';

const { Text } = Typography;

const { Meta } = List.Item;

interface PlayListProps {
  open: boolean;
  onClose: () => void;
}

const playListSelectors = (s: DanceStore) => {
  return {
    playlist: s.playlist,
    currentPlay: s.currentPlay,
    isPlaying: s.isPlaying,
    playItem: s.playItem,
    removePlayItem: s.removePlayItem,
    setIsPlaying: s.setIsPlaying,
    clearPlayList: s.clearPlayList,
  };
};

const PlayList = (props: PlayListProps) => {
  const { open = false, onClose } = props;
  const { token } = theme.useToken();
  const {
    playlist,
    playItem,
    removePlayItem,
    currentPlay,
    isPlaying,
    setIsPlaying,
    clearPlayList,
  } = useDanceStore((s) => playListSelectors(s));

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={400}
      closeIcon={null}
      styles={{
        header: { padding: 12 },
        body: { padding: 0 },
      }}
      title="当前播放列表"
      extra={
        <Button size="small" icon={<DeleteOutlined />} onClick={() => clearPlayList()}>
          清空列表
        </Button>
      }
    >
      <List
        size="small"
        dataSource={playlist}
        renderItem={(item) => {
          const isCurrentPlay = currentPlay ? currentPlay!.name === item.name : false;

          return (
            <List.Item
              actions={[
                isCurrentPlay && isPlaying ? (
                  <ActionIcon
                    icon={Pause}
                    key="pause"
                    onClick={() => setIsPlaying(false)}
                    size="small"
                  />
                ) : (
                  <ActionIcon
                    icon={PlayIcon}
                    key="play"
                    onClick={() => playItem(item)}
                    size="small"
                  />
                ),
                <ActionIcon
                  icon={XIcon}
                  key="delete"
                  onClick={() => removePlayItem(item)}
                  size="small"
                />,
              ]}
              style={{
                cursor: 'pointer',
                backgroundColor: isCurrentPlay ? token.colorBgSpotlight : undefined,
              }}
              onDoubleClick={() => {
                if (isPlaying) {
                  setIsPlaying(false);
                } else {
                  playItem(item);
                }
              }}
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
