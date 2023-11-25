import { VRMExpressionPresetName } from '@pixiv/three-vrm';

export const emotions = ['neutral', 'happy', 'angry', 'sad', 'relaxed'] as const;
export type EmotionType = (typeof emotions)[number] | VRMExpressionPresetName;

export enum TouchAreaEnum {
  Head = 'head',
  Arm = 'arm',
  Leg = 'leg',
  Chest = 'chest',
  Belly = 'belly',
}

export interface TouchAction {
  text: string;
  motion?: string;
  emotion: EmotionType;
  enabled: boolean;
}

export interface TouchActionConfig {
  [TouchAreaEnum.Head]: TouchAction[];
  [TouchAreaEnum.Arm]: TouchAction[];
  [TouchAreaEnum.Leg]: TouchAction[];
  [TouchAreaEnum.Chest]: TouchAction[];
  [TouchAreaEnum.Belly]: TouchAction[];
  enabled: boolean;
}
