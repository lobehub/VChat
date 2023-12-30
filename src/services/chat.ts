import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { speakCharacter } from '@/features/messages/speakCharacter';
import { configSelectors, useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';

const createHeader = (header?: HeadersInit) => {
  const config = configSelectors.currentOpenAIConfig(useConfigStore.getState());
  return {
    'Content-Type': 'application/json',
    [OPENAI_API_KEY]: config?.apikey || '',
    [OPENAI_END_POINT]: config?.endpoint || '',
    ...header,
  };
};

export const chatCompletion = async (payload: any) => {
  const config = configSelectors.currentOpenAIConfig(useConfigStore.getState());

  const res = await fetch('/api/chat/openai', {
    method: 'POST',
    headers: createHeader(),
    body: JSON.stringify({
      model: config?.model,
      ...payload,
    }),
  });
  return res;
};

export const handleSpeakAi = async (message: string) => {
  const viewer = useViewerStore.getState().viewer;
  const setVoiceLoading = useSessionStore.getState().setVoiceLoading;
  const currentAgent = sessionSelectors.currentAgent(useSessionStore.getState());

  speakCharacter(
    {
      emotion: 'aa',
      tts: {
        ...currentAgent?.tts,
        message: message,
      },
    },
    viewer,
    () => {
      setVoiceLoading(true);
    },
    () => {
      setVoiceLoading(false);
    },
  );
};

export const handleStopSpeakAi = async () => {
  const viewer = useViewerStore.getState().viewer;
  const setVoiceLoading = useSessionStore.getState().setVoiceLoading;
  setVoiceLoading(false);
  viewer.model?.stopSpeak();
};
