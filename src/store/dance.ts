import { create } from 'zustand';
import { Dance } from './type';

interface DanceStore {
  currentIdentifier: string;
  currentPlay: Dance | null;
  danceList: any[];
  playlist: Dance[];
  isPlaying: boolean;
  activateDance: (identifier: string) => void;
  deactivateDance: () => void;
  setPlayList: (playlist: Dance[]) => void;
  playItem: (dance: Dance) => void;
  addAndPlayItem: (dance: Dance) => void;
  removePlayItem: (dance: Dance) => void;
  setDanceList: (danceList: any[]) => void;
  setIsPlaying: (play: boolean) => void;
  prevDance: () => void;
  nextDance: () => void;
}

export const useDanceStore = create<DanceStore>()((set, get) => ({
  playlist: [],
  isPlaying: false,
  currentIdentifier: '',
  currentPlay: null,
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
  playItem: (dance) => {
    set({ currentPlay: dance, isPlaying: true });
  },
  addAndPlayItem: (dance) => {
    const { playlist, playItem } = get();
    const index = playlist.findIndex((item) => item.name === dance.name);

    if (index === -1) {
      playlist.unshift(dance);
    }
    playItem(dance);
  },
  setIsPlaying: (play) => {
    set({ isPlaying: play });
  },
  removePlayItem: (dance) => {
    const { playlist } = get();
    const currentPlayIndex = playlist.findIndex((item) => item.name === dance.name);

    playlist.splice(currentPlayIndex, 1);
  },
  prevDance: () => {
    const { currentPlay, playlist, playItem } = get();
    if (currentPlay && playlist.length > 0) {
      const currentPlayIndex = playlist.findIndex((item) => item.name === currentPlay.name);
      if (currentPlayIndex > 0) {
        playItem(playlist[currentPlayIndex - 1]);
      } else {
        playItem(playlist[playlist.length - 1]);
      }
    }
  },
  nextDance: () => {
    const { currentPlay, playlist, playItem } = get();
    if (currentPlay && playlist.length > 0) {
      const currentPlayIndex = playlist.findIndex((item) => item.name === currentPlay.name);
      if (currentPlayIndex < playlist.length - 1) {
        playItem(playlist[currentPlayIndex + 1]);
      } else {
        playItem(playlist[0]);
      }
    }
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
