import { ChatMessage } from '@/types/chat';
import { FC } from 'react';
import { type ActionsBarProps } from '../components/ChatItem/ActionsBar';

export type RenderAction = FC<ActionsBarProps & ChatMessage>;
