import { SongItem } from '../types/moodify';

export const getRandomSongs = (
  songData: SongItem[],
  count: number
): SongItem[] => {
  const shuffeled = [...songData].sort(() => 0.5 - Math.random());
  return shuffeled.slice(0, count);
};

export const getRandomBGcolors = (colors: string[]): string => {
  const shuffeled = [...colors].sort(() => 0.5 - Math.random());
  return shuffeled[0]; // Return a single string, not an array
};
