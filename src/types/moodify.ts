export type Categories =
  | 'All'
  | 'Sad'
  | 'Inspirational'
  | 'Happy'
  | 'Dramatic'
  | 'Calm';

export interface SongItem {
  id: number;
  title: string;
  artist: string;
  genre: string;
  mood: Categories;
  thumbnailUrl: string;
  audioUrl: string;
  duration: string;
}

export interface Songs {
  songs: SongItem[];
}
