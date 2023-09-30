/* eslint-disable @next/next/no-img-element */
import { useDanceStore } from '@/store/dance';
import { Drawer } from 'antd';
import { memo } from 'react';

interface PlayListProps {
  open: boolean;
  onClose: () => void;
}

const PlayList = (props: PlayListProps) => {
  const { open = false, onClose } = props;
  const { playlist } = useDanceStore();
  return <Drawer open={open} onClose={onClose} width={400} title="播放列表"></Drawer>;
};

export default memo(PlayList);
