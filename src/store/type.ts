import { VRMExpressionPresetName } from '@pixiv/three-vrm';

export interface Agent {
  /**
   * 角色名
   */
  name: string;
  /**
   * 本地目录
   */
  dirname?: string;
  /**
   * 角色描述
   */
  description: string;
  /**
   * 主页地址，一般为 Vroid Hub 的地址
   */
  homepage: string;
  /**
   * 模型文件路径
   */
  model: string;
  /**
   * 封面图片路径
   */
  cover: string;
  /**
   * 头像图片路径
   */
  avatar: string;
  /**
   * 说明文件
   */
  readme: string;
  /**
   * 角色设定
   */
  systemRole: string;
  /**
   * 角色 tts 配置文件
   */
  tts: TTS;
}

export interface Dance {
  /**
   * 舞蹈名
   */
  name: string;
  /**
   * 本地目录
   */
  dirname?: string;
  /**
   * 舞蹈文件
   */
  src: string;
  /**
   * 音频文件
   */
  audio: string;
  /**
   * 封面图片
   */
  cover: string;
  /**
   * 缩略图
   */
  thumb: string;
  /**
   * 说明文件
   */
  readme: string;
}

export interface Voice {
  locale: string;
  localeZH: string;
  DisplayVoiceName: string;
  DisplayName: string;
  LocalName: string;
  ShortName: string;
  PreviewSentence: string;
}

export enum TouchAreaEnum {
  Head = 'head',
  Arm = 'arm',
  Leg = 'leg',
  Chest = 'chest',
  Belly = 'belly',
}

export type TTS_ENGINE = 'microsoft' | 'edge';

export const emotions = ['neutral', 'happy', 'angry', 'sad', 'relaxed'] as const;
export type EmotionType = (typeof emotions)[number] | VRMExpressionPresetName;

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
  message: string;
  /**
   * 速度
   */
  speed?: number;
  /**
   * 音调
   */
  pitch?: number;
};
