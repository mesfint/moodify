import { AlbumItem } from '../types/spotify';

export const getRandomAlbum = (
  albums: AlbumItem[],
  count: number
): AlbumItem[] => {
  const shuffeled = [...albums].sort(() => 0.5 - Math.random());
  return shuffeled.slice(0, count);
};
