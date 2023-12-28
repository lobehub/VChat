import { Dance } from '@/types/dance'; // 更改这里
import { DanceStore } from '../index'; // 更改这里

const showSideBar = (s: DanceStore) => !!s.currentIdentifier; // 更改这里

const currentDanceItem = (s: DanceStore): Dance | undefined => {
  // 更改这里
  const { currentIdentifier, danceList } = s; // 更改这里
  const currentDance = danceList.find((item) => item.danceId === currentIdentifier); // 更改这里
  if (!currentDance) return undefined; // 更改这里

  return currentDance; // 更改这里
};

const subscribed = (s: DanceStore) => (danceId: string) => {
  // 更改这里
  const { danceList } = s; // 更改这里
  const index = danceList.findIndex((item) => item.danceId === danceId); // 更改这里

  return index !== -1;
};

export const danceListSelectors = {
  // 更改这里
  showSideBar,
  currentDanceItem, // 更改这里
  subscribed,
};
