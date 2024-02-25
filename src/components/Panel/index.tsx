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

import React, { PropsWithChildren, useEffect, useState } from 'react';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  title?: string;
  onClose: () => void;
  onCoordinatesChange?: (coordinates: Coordinates) => void;
  coordinates?: Coordinates;
}

const Panel = (props: PropsWithChildren<ControlPanelProps>) => {
  const {
    style,
    className,
    children,
    onClose,
    title,
    onCoordinatesChange,
    coordinates = {
      x: window.innerWidth / 2 - 450,
      y: window.innerHeight / 2 - 320,
    },
  } = props;
  const [{ x, y }, setCoordinates] = useState<Coordinates>(coordinates);

  useEffect(() => {
    if (coordinates.x !== x || coordinates.y !== y) setCoordinates(coordinates);
  }, [coordinates.x, coordinates.y]);

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
          const newCoordinates = {
            x: x + delta.x,
            y: y + delta.y,
          };
          onCoordinatesChange?.(newCoordinates);
          return newCoordinates;
        });
      }}
    >
      <Container x={x} y={y} onClose={onClose} style={style} className={className} title={title}>
        {children}
      </Container>
    </DndContext>
  );
};

export default Panel;
