import { Viewer } from '@/features/vrmViewer/viewer';
import { create } from 'zustand';

interface ViewerStore {
  viewer: Viewer;
}

const viewer = new Viewer();

export const useViewerStore = create<ViewerStore>()(() => ({
  viewer,
}));
