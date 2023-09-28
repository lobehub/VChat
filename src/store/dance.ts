import { create } from 'zustand';
import { Dance } from './type';

interface DanceStore {
  activateDance: (identifier: string) => void;
  deactivateDance: () => void;
  currentIdentifier: string;
  danceList: any[];
  setDanceList: (danceList: any[]) => void;
}

export const useDanceStore = create<DanceStore>()((set) => ({
  currentIdentifier: '',
  danceList: [],
  setDanceList: (danceList) => {
    set({ danceList: danceList });
  },
  activateDance: (identifier) => {
    set({ currentIdentifier: identifier });
  },
  deactivateDance: () => {
    set({ currentIdentifier: undefined }, false);
  },
}));

export const DEFAULT_AGENT_ITEM: Dance = {
  name: '',
  cover: '',
  src: '',
  audio: '',
  thumb: '',
  readme: '',
};

const showSideBar = (s: DanceStore) => !!s.currentIdentifier;

const currentDanceItem = (s: DanceStore): Dance => {
  const { danceList, currentIdentifier } = s;
  const currentAgent = danceList.find((item) => item.name === currentIdentifier);
  if (!currentAgent) return DEFAULT_AGENT_ITEM;

  return currentAgent;
};

export const danceListSelectors = {
  showSideBar,
  currentDanceItem,
};
