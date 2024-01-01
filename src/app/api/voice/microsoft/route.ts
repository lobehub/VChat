const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { ssml } = await req.json();
  const data = JSON.stringify({
    ssml,
    ttsAudioFormat: 'audio-24khz-160kbitrate-mono-mp3',
    offsetInPlainText: 0,
    properties: {
      SpeakTriggerSource: 'AccTuningPagePlayButton',
    },
  });

  const config = {
    method: 'post',
    url: 'https://southeastasia.api.speech.microsoft.com/accfreetrial/texttospeech/acc/v3.0-beta1/vcg/speak',
    responseType: 'arraybuffer',
    headers: {
      authority: 'southeastasia.api.speech.microsoft.com',
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9',
      customvoiceconnectionid: uuidv4(),
      origin: 'https://speech.microsoft.com',
      'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'content-type': 'application/json',
    },

    data: data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (err) {
    return NextResponse.json({ success: false, errorMessage: '转换失败' }, { status: 400 });
  }
};
