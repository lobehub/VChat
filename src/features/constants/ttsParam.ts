export type TTSParam = {
  speakerX: number;
  speakerY: number;
};

export const DEFAULT_PARAM: TTSParam = {
  speakerX: 1.32,
  speakerY: 1.88,
} as const;

export const PRESET_A: TTSParam = {
  speakerX: -1.27,
  speakerY: 1.92,
} as const;

export const PRESET_B: TTSParam = {
  speakerX: 1.32,
  speakerY: 1.88,
} as const;

export const PRESET_C: TTSParam = {
  speakerX: 0.73,
  speakerY: -1.09,
} as const;

export const PRESET_D: TTSParam = {
  speakerX: -0.89,
  speakerY: -2.6,
} as const;
