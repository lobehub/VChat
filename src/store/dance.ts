import { create } from 'zustand';
import { Dance } from './type';

interface DanceStore {
  currentIdentifier: string;
  currentDance: Dance | undefined;
  danceList: any[];
  playlist: Dance[];
  isPlaying: boolean;
  activateDance: (identifier: string) => void;
  deactivateDance: () => void;
  setPlayList: (playlist: Dance[]) => void;
  addAndPlayItem: (dance: Dance) => void;
  removePlayItem: (name: string) => void;
  setDanceList: (danceList: any[]) => void;
  setCurrentDance: (dance: Dance) => void;
  setIsPlaying: (play: boolean) => void;
}

export const useDanceStore = create<DanceStore>()((set, get) => ({
  playlist: [],
  isPlaying: false,
  currentIdentifier: '',
  currentDance: undefined,
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
  setPlayList: (playlist) => {
    set({ playlist: playlist });
  },
  setCurrentDance: (dance) => {
    set({ currentDance: dance });
  },
  addAndPlayItem: (dance) => {
    const { playlist, setCurrentDance, setIsPlaying } = get();
    const danceInList = playlist.find((item) => item.name === dance.name);
    // 如果已有，就不再添加
    if (!danceInList) {
      playlist.unshift(dance);
    }
    setCurrentDance(dance);
    setIsPlaying(true);
  },
  setIsPlaying: (play) => {
    set({ isPlaying: play });
  },
  removePlayItem: (name) => {
    const playlist = get().playlist;
    playlist.splice(
      playlist.findIndex((dance) => dance.name === name),
      1,
    );
  },
}));

export const DEFAULT_DANCE_ITEM: Dance = {
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
  const currentDance = danceList.find((item) => item.name === currentIdentifier);
  if (!currentDance) return DEFAULT_DANCE_ITEM;

  return currentDance;
};

export const danceListSelectors = {
  showSideBar,
  currentDanceItem,
};
