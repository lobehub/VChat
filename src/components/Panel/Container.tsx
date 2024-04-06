import { INITIAL_COORDINATES, INITIAL_Z_INDEX } from '@/constants/common';
import { useDraggable } from '@dnd-kit/core';
import { ActionIcon, Logo } from '@lobehub/ui';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { XIcon } from 'lucide-react';
import React, { PropsWithChildren, memo } from 'react';
import { useStyles } from './style';

interface ContainerProps {
  style?: React.CSSProperties;
  className?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  x: number;
  y: number;
  zIndex?: number;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onClose: () => void;
}

const Container = (props: PropsWithChildren<ContainerProps>) => {
  const {
    style,
    className,
    children,
    onClose,
    x = INITIAL_COORDINATES.x,
    y = INITIAL_COORDINATES.y,
    title,
    extra,
    zIndex = INITIAL_Z_INDEX,
    onBlur,
    onFocus,
  } = props;
  const { styles } = useStyles();

  const { attributes, listeners, transform, setNodeRef, setActivatorNodeRef } = useDraggable({
    id: 'draggable',
  });

  const transformer = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div ref={setNodeRef} onFocus={onFocus} onBlur={onBlur}>
      <div
        className={classNames(styles.box, className)}
        style={{
          ...style,
          left: x,
          top: y,
          zIndex,
          ...transformer,
        }}
        {...attributes}
      >
        <div className={classNames(styles.header)} ref={setActivatorNodeRef} {...listeners}>
          <div className={styles.logo}>
            <Logo extra={'VChat'} size={24} type={'combine'} />
          </div>
          <div className={styles.title}>{title ? title : null}</div>
          <div className={styles.extra}>
            {extra ? extra : null}
            <Tooltip title="关闭" key="close">
              <ActionIcon icon={XIcon} onClick={handleClose} />
            </Tooltip>
          </div>
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default memo(Container);
