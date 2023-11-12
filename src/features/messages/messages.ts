import { TTSParam } from '@/features/constants/ttsParam';
import { TTS, TalkStyle } from '@/store/type';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';

// ChatGPT API
export type Message = {
  role: 'assistant' | 'system' | 'user';
  content: string;
};

const emotions = ['neutral', 'happy', 'angry', 'sad', 'relaxed'] as const;
type EmotionType = (typeof emotions)[number] & VRMExpressionPresetName;

/**
 * 発話文と音声の感情と、モデルの感情表現がセットになった物
 */
export type Screenplay = {
  expression: EmotionType;
  talk: TTS;
};

export const splitSentence = (text: string): string[] => {
  const splitMessages = text.split(/(?<=[。．！？\n])/g);
  return splitMessages.filter((msg) => msg !== '');
};

export const textsToScreenplay = (texts: string[], ttsParam: TTSParam): Screenplay[] => {
  const screenplays: Screenplay[] = [];
  let prevExpression = 'neutral';
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];

    const match = text.match(/\[(.*?)\]/);

    const tag = (match && match[1]) || prevExpression;

    const message = text.replace(/\[(.*?)\]/g, '');

    let expression = prevExpression;
    if (emotions.includes(tag as any)) {
      expression = tag;
      prevExpression = tag;
    }

    screenplays.push({
      expression: expression as EmotionType,
      talk: {
        style: emotionToTalkStyle(expression as EmotionType),
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
