export type TTS_ENGINE = 'microsoft' | 'edge';

// TODO: 需要根据不同 API 进行适配
export const talkStyles = ['talk', 'happy', 'sad', 'angry', 'fear', 'surprised'] as const;

export type TalkStyle = (typeof talkStyles)[number];

export type TTS = {
  /**
   * TTS 引擎
   */
  engine?: TTS_ENGINE;
  /**
   * 风格
   */
  style?: TalkStyle;
  /**
   * 语音模型
   */
  voice?: string;
  /**
   * 多语音标识
   */
  locale?: string;
  /**
   * 消息
   */
  message?: string;
  /**
   * 速度
   */
  speed?: number;
  /**
   * 音调
   */
  pitch?: number;
};

export interface Voice {
  locale: string;
  localeZH: string;
  DisplayVoiceName: string;
  DisplayName: string;
  LocalName: string;
  ShortName: string;
  PreviewSentence: string;
}
