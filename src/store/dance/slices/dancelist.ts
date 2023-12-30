import { getDanceIndex } from '@/services/dance';
import { DanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { produce } from 'immer';
import { isEqual } from 'lodash-es';
import { StateCreator } from 'zustand/vanilla';

export interface DanceListStore {
  currentIdentifier: string;
  danceList: Dance[];
  danceLoading: boolean;
  activateDance: (identifier: string) => void;
  deactivateDance: () => void;
  fetchDanceIndex: () => void;
  subscribe: (dance: Dance) => void;
  unsubscribe: (danceId: string) => void;
}

export const createDanceStore: StateCreator<
  DanceStore,
  [['zustand/devtools', never]],
  [],
  DanceListStore
> = (set, get) => {
  return {
    currentIdentifier: '',
    danceList: [],
    danceLoading: false,
    activateDance: (identifier) => {
      set({ currentIdentifier: identifier });
    },
    deactivateDance: () => {
      set({ currentIdentifier: undefined });
    },
    fetchDanceIndex: async () => {
      set({ danceLoading: true });
      try {
        const { dances = [] } = await getDanceIndex();
        const { danceList } = get();
        if (!isEqual(danceList, dances)) set({ danceList: dances });
      } catch (error) {
        set({ danceList: [] });
      } finally {
        set({ danceLoading: false });
      }
    },
    subscribe: (dance) => {
      const { danceList } = get();

      const newList = produce(danceList, (draft) => {
        const index = draft.findIndex((item) => item.danceId === dance.danceId);

        if (index === -1) {
          draft.unshift(dance);
        }
      });
      set({ danceList: newList });
    },
    unsubscribe: (danceId) => {
      const { danceList } = get();
      const newList = produce(danceList, (draft) => {
        const index = draft.findIndex((item) => item.danceId === danceId);

        if (index !== -1) {
          draft.splice(index, 1);
        }
      });
      set({ danceList: newList });
    },
  };
};
