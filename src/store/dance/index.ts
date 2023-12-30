import { create } from 'zustand';
import { danceListSelectors } from './selectors/dance';
import { DanceListStore, createDanceStore } from './slices/dancelist';
import { PlayListStore, createPlayListStore } from './slices/playlist';

export type DanceStore = DanceListStore & PlayListStore;

export const useDanceStore = create<DanceStore>()((...parameters) => ({
  ...createDanceStore(...parameters),
  ...createPlayListStore(...parameters),
}));

export { danceListSelectors };
