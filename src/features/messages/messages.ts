import { EmotionType, TTS, TalkStyle, emotions } from '@/types/tts';

// ChatGPT API
export type Message = {
  role: 'assistant' | 'system' | 'user';
  content: string;
};

export type Screenplay = {
  emotion: EmotionType;
  tts: TTS;
};

export const splitSentence = (text: string): string[] => {
  const splitMessages = text.split(/(?<=[。．！？\n])/g);
  return splitMessages.filter((msg) => msg !== '');
};

export const textsToScreenplay = (texts: string[], ttsParam: TTS): Screenplay[] => {
  const screenplays: Screenplay[] = [];
  let prevEmotion = 'neutral';
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];

    const match = text.match(/\[(.*?)\]/);

    const tag = (match && match[1]) || prevEmotion;

    const message = text.replace(/\[(.*?)\]/g, '');

    let emotion = prevEmotion;
    if (emotions.includes(tag as any)) {
      emotion = tag;
      prevEmotion = tag;
    }

    screenplays.push({
      emotion: emotion as EmotionType,
      tts: {
        ...ttsParam,
        style: emotionToTalkStyle(emotion as EmotionType),
        message: message,
      },
    });
  }

  return screenplays;
};

const emotionToTalkStyle = (emotion: EmotionType): TalkStyle => {
  switch (emotion) {
    case 'angry':
      return 'angry';
    case 'happy':
      return 'happy';
    case 'sad':
      return 'sad';
    default:
      return 'talk';
  }
};
