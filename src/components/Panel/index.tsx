import { INITIAL_COORDINATES, INITIAL_Z_INDEX } from '@/constants/common';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Coordinates } from '@dnd-kit/utilities';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Container from './Container';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  title?: string;
  onClose: () => void;
  onCoordinatesChange?: (coordinates: Coordinates) => void;
  coordinates?: Coordinates;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  zIndex?: number;
}

const Panel = (props: PropsWithChildren<ControlPanelProps>) => {
  const {
    style,
    className,
    children,
    onClose,
    title,
    onCoordinatesChange,
    onBlur,
    onFocus,
    zIndex = INITIAL_Z_INDEX,
    coordinates = INITIAL_COORDINATES,
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
      <Container
        x={x}
        y={y}
        zIndex={zIndex}
        onClose={onClose}
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
        className={className}
        title={title}
      >
        {children}
      </Container>
    </DndContext>
  );
};

export default Panel;
