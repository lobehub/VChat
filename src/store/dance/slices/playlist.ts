import { DEFAULT_DANCE } from '@/constants/dance';
import { DanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { produce } from 'immer';
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
  togglePlayPause: () => void;
  clearPlayList: () => void;
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

    togglePlayPause: () => {
      if (!get().currentPlay) return;
      set({ isPlaying: !get().isPlaying });
    },

    clearPlayList: () => {
      set({ playlist: [], currentPlay: null, isPlaying: false });
    },

    setPlayList: (playlist) => {
      set({ playlist: playlist });
    },
    playItem: (dance) => {
      set({ currentPlay: dance, isPlaying: true });
    },
    addAndPlayItem: (dance) => {
      const { playlist, playItem } = get();

      const nextPlayList = produce(playlist, (draftState) => {
        const index = draftState.findIndex((item) => item.name === dance.name);
        if (index === -1) {
          draftState.unshift(dance);
        }
      });

      set({ playlist: nextPlayList });

      playItem(dance);
    },
    removePlayItem: (dance) => {
      const { playlist } = get();
      const nextPlayList = produce(playlist, (draftState) => {
        const currentPlayIndex = draftState.findIndex((item) => item.name === dance.name);
        draftState.splice(currentPlayIndex, 1);
      });

      if (nextPlayList.length === 0) {
        set({ currentPlay: null, isPlaying: false, playlist: nextPlayList });
      } else {
        set({ playlist: nextPlayList });
      }
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
