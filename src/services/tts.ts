const axios = require('axios');

type TTS_TYPE = 'microsoft' | 'edge' | 'azure';

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

  const data = await res.arrayBuffer();
  return data;
};
