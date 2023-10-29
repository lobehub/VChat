const axios = require('axios');

export const speechApi = async (ssml: string) => {
  const res = await fetch('/api/voice/microsoft', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ssml }),
  });

  return res.json();
};
