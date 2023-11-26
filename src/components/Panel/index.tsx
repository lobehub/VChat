import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Coordinates } from '@dnd-kit/utilities';

import Container from './Container';

import React, { PropsWithChildren, useState } from 'react';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  onClose: () => void;
  defaultCoordinates?: Coordinates;
}

const Panel = (props: PropsWithChildren<ControlPanelProps>) => {
  const {
    style,
    className,
    children,
    onClose,
    defaultCoordinates = {
      x: 200,
      y: 200,
    },
  } = props;
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {});

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
    >
      <Container x={x} y={y} onClose={onClose} style={style} className={className}>
        {children}
      </Container>
    </DndContext>
  );
};

export default Panel;
