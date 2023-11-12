import { TTS, TTS_ENGINE, Voice } from '@/store/type';

const convertSSML = (values: TTS) => {
  const { voice, speed = 1, pitch = 1, text } = values;

  return `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
      <voice name="${voice}">
        <prosody rate="${((speed - 1) * 100).toFixed()}%" pitch="${((pitch - 1) * 50).toFixed()}%">
              ${text}
        </prosody>
      </voice>
  </speak>
  `;
};

export const speechApi = async (tts: TTS) => {
  const { engine = 'edge' } = tts;
  const ssml = convertSSML(tts);
  const res = await fetch(`/api/voice/${engine}`, {
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

  const buffer = await res.arrayBuffer();
  return buffer;
};

const getVoiceKey = (engine: TTS_ENGINE) => {
  return `vidol_voice_${engine}`;
};

export const voiceListApi = async (engine: TTS_ENGINE): Promise<{ data: Voice[] }> => {
  const key = getVoiceKey(engine);
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key) || '');
  }
  const res = await fetch(`/api/voice/${engine}/voices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  sessionStorage.setItem(key, JSON.stringify(result));

  return result;
};
