import { create } from 'zustand';
import { Dance } from './type';

interface DanceStore {
  currentIdentifier: string;
  currentPlayIndex: number;
  danceList: any[];
  playlist: Dance[];
  isPlaying: boolean;
  activateDance: (identifier: string) => void;
  deactivateDance: () => void;
  setPlayList: (playlist: Dance[]) => void;
  addAndPlayItem: (dance: Dance) => void;
  removePlayItem: (index: number) => void;
  setDanceList: (danceList: any[]) => void;
  setCurrentPlayIndex: (index: number) => void;
  setIsPlaying: (play: boolean) => void;
  prevDance: () => void;
  nextDance: () => void;
}

export const useDanceStore = create<DanceStore>()((set, get) => ({
  playlist: [],
  isPlaying: false,
  currentIdentifier: '',
  currentPlayIndex: 0,
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
  setCurrentPlayIndex: (index: number) => {
    set({ currentPlayIndex: index });
  },
  addAndPlayItem: (dance) => {
    const { playlist, setCurrentPlayIndex, setIsPlaying } = get();
    const index = playlist.findIndex((item) => item.name === dance.name);

    if (index === -1) {
      playlist.unshift(dance);
      setCurrentPlayIndex(0);
    } else {
      // 如果已有，就不再添加
      setCurrentPlayIndex(index);
    }
    setIsPlaying(true);
  },
  setIsPlaying: (play) => {
    set({ isPlaying: play });
  },
  removePlayItem: (index) => {
    const playlist = get().playlist;
    playlist.splice(index, 1);
  },
  prevDance: () => {
    const { currentPlayIndex, setCurrentPlayIndex, playlist } = get();
    if (currentPlayIndex > 0) {
      setCurrentPlayIndex(currentPlayIndex - 1);
    } else {
      setCurrentPlayIndex(playlist.length - 1);
    }
  },
  nextDance: () => {
    const { currentPlayIndex, setCurrentPlayIndex, playlist } = get();
    if (currentPlayIndex < playlist.length - 1) {
      setCurrentPlayIndex(currentPlayIndex + 1);
    } else {
      setCurrentPlayIndex(0);
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

const currentPlayItem = (s: DanceStore): Dance | undefined => {
  const { playlist, currentPlayIndex } = s;
  const currentPlay = playlist[currentPlayIndex];
  if (!currentPlay) return undefined;

  return currentPlay;
};

export const danceListSelectors = {
  showSideBar,
  currentDanceItem,
};

export const playListSelectors = {
  currentPlayItem,
};
