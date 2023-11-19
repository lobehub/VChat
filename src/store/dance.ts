import { getLocalDanceList } from '@/services/dance';
import { Dance } from '@/types/dance';
import { create } from 'zustand';

interface DanceStore {
  loading: boolean;
  currentIdentifier: string;
  currentPlay: Dance | null;
  danceList: Dance[];
  playlist: Dance[];
  isPlaying: boolean;
  fetchDanceList: () => void;
  activateDance: (identifier: string) => void;
  deactivateDance: () => void;
  setPlayList: (playlist: Dance[]) => void;
  playItem: (dance: Dance) => void;
  addAndPlayItem: (dance: Dance) => void;
  removePlayItem: (dance: Dance) => void;
  setIsPlaying: (play: boolean) => void;
  prevDance: () => void;
  nextDance: () => void;
}

export const useDanceStore = create<DanceStore>()((set, get) => ({
  loading: false,
  playlist: [],
  isPlaying: false,
  currentIdentifier: '',
  currentPlay: null,
  danceList: [],
  fetchDanceList: async () => {
    set({ loading: true });
    const res = await getLocalDanceList();
    set({ danceList: res.data, loading: false });
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
