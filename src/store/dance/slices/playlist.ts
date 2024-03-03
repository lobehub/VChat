import { DEFAULT_DANCE } from '@/constants/dance';
import { DanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { StateCreator } from 'zustand/vanilla';

export interface PlayListStore {
  currentPlay: Dance | null;
  playlist: Dance[];
  setPlayList: (playlist: Dance[]) => void;
  playItem: (dance: Dance) => void;
  addAndPlayItem: (dance: Dance) => void;
  removePlayItem: (dance: Dance) => void;
  prevDance: () => void;
  nextDance: () => void;
}

export const createPlayListStore: StateCreator<
  DanceStore,
  [['zustand/devtools', never]],
  [],
  PlayListStore
> = (set, get) => {
  return {
    playlist: [DEFAULT_DANCE],
    isPlaying: false,
    currentPlay: null,

    setPlayList: (playlist) => {
      set({ playlist: playlist });
    },
    playItem: (dance) => {
      set({ currentPlay: dance });
    },
    addAndPlayItem: (dance) => {
      const { playlist, playItem } = get();
      const index = playlist.findIndex((item) => item.name === dance.name);

      if (index === -1) {
        playlist.unshift(dance);
      }
      playItem(dance);
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
  };
};
