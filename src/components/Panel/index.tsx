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
}
const defaultCoordinates = {
  x: 250,
  y: 250,
};

const Panel = (props: PropsWithChildren<ControlPanelProps>) => {
  const { style, className, children, onClose } = props;
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);

  const mouseSensor = useSensor(MouseSensor);
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
