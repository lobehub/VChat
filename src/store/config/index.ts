import { Config, Panel, PanelKey } from '@/types/config';
import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { ConfigState, initialState } from './initialState';
import { configSelectors } from './selectors/config';

const CONFIG_STORAGE_KEY = 'vidol-chat-config-storage';

export interface ConfigAction {
  /**
   * Set panel config
   * @param panel
   * @param config
   */
  setPanel: (panel: PanelKey, config: Partial<Panel>) => void;
  /**
   * Set config
   * @param config
   */
  setConfig: (config: Partial<Config>) => void;
  /**
   * Reset config
   */
  resetConfig: () => void;
  /**
   * Set OpenAI config
   * @param config
   */
  setOpenAIConfig: (config: Partial<Config['languageModel']['openAI']>) => void;
  /**
   * Focus panel
   * @param key
   */
  focusPanel: (key: PanelKey) => void;
  /**
   * Open panel
   * @param key
   */
  openPanel: (key: PanelKey) => void;
  /**
   * Close panel
   * @param key
   */
  closePanel: (key: PanelKey) => void;
}

export interface ConfigStore extends ConfigState, ConfigAction {}

const createStore: StateCreator<ConfigStore, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,
  setPanel: (panel, config) => {
    const prevSetting = get().panel[panel];
    const nextSetting = produce(prevSetting, (draftState) => {
      merge(draftState, config);
    });

    if (isEqual(prevSetting, nextSetting)) return;
    set((state) => ({
      panel: {
        ...state.panel,
        [panel]: nextSetting,
      },
    }));
  },

  openPanel: (key: PanelKey) => {
    const { setPanel, focusPanel } = get();
    setPanel(key, { open: true });
    focusPanel(key);
  },

  closePanel: (key: PanelKey) => {
    const { setPanel, focusList } = get();
    setPanel(key, { open: false });
    const nextSetting = focusList.filter((item) => item !== key);
    set({ focusList: nextSetting });
  },

  focusPanel: (key: PanelKey) => {
    const { focusList } = get();
    let nextSetting: PanelKey[] = focusList.filter((item) => item !== key).concat(key);
    set({ focusList: nextSetting });
  },

  resetConfig: () => {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    set({ ...initialState });
  },

  setConfig: (config) => {
    const prevSetting = get().config;
    const nextSetting = produce(prevSetting, (draftState) => {
      merge(draftState, config);
    });
    if (isEqual(prevSetting, nextSetting)) return;
    set({ config: nextSetting });
  },
  setOpenAIConfig: (config) => {
    get().setConfig({ languageModel: { openAI: config } });
  },
});

export const useConfigStore = createWithEqualityFn<ConfigStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_CONFIG_STORE',
    }),
    { name: CONFIG_STORAGE_KEY },
  ),
  shallow,
);

export { configSelectors };
