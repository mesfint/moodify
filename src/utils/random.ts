import { SongItem } from '../types/moodify';

export const getRandomSongs = (
  songData: SongItem[],
  count: number
): SongItem[] => {
  const shuffeled = [...songData].sort(() => 0.5 - Math.random());
  return shuffeled.slice(0, count);
};
