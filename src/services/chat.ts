import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { speakCharacter } from '@/features/messages/speakCharacter';
import { useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';

const createHeader = (header?: HeadersInit) => {
  const setting = useConfigStore.getState().setting;
  return {
    'Content-Type': 'application/json',
    [OPENAI_API_KEY]: setting.apikey,
    [OPENAI_END_POINT]: setting.endpoint,
    ...header,
  };
};

export const chatCompletion = async (payload: any) => {
  const setting = useConfigStore.getState().setting;

  const res = await fetch('/api/chat/openai', {
    method: 'POST',
    headers: createHeader(),
    body: JSON.stringify({
      model: setting.model,
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
