const axios = require('axios');

type TTS_TYPE = 'microsoft' | 'edge' | 'azure';

export type Voice = {
  locale: string;
  localeZH: string;
  DisplayVoiceName: string;
  DisplayName: string;
  LocalName: string;
  ShortName: string;
  PreviewSentence: string;
};

export const speechApi = async (type: TTS_TYPE, ssml: string) => {
  const res = await fetch(`/api/voice/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ssml }),
  });
  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.errorMessage);
  }

  const data = await res.blob();
  return data;
};

const getVoiceKey = (type: string) => {
  return `vidol_voice_${type}`;
};

export const voiceApi = async (type: TTS_TYPE): Promise<{ data: Voice[] }> => {
  const key = getVoiceKey(type);
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key) || '');
  }
  const res = await fetch(`/api/voice/${type}/voices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  sessionStorage.setItem(key, JSON.stringify(result));

  return result;
};
