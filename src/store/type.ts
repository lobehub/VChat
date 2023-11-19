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
