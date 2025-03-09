export interface UserProfile {
  display_name: string;
  email: string;
  id: string;
  images: { url: string }[];
  uri: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface CategoryItem {
  href: string;
  id: string;
  name: string;
  icons: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
}

export interface MusicCategories {
  categories: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    items: CategoryItem[];
  };
}
//
export interface PlaylistItem {
  id: string;
  name: string;
  href: string;
  description: string;
  release_date: Date;
  images: { url: string; height: number | null; width: number | null }[];
}

export interface PlaylistsResponse {
  playlists: {
    href: string;
    items: PlaylistItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}

export interface AlbumItem {
  id: string;
  name: string;
  href: string;
  release_date: string; // e.g., "2025-03-01"
  artists: { id: string; name: string }[];
  images: { url: string; height: number | null; width: number | null }[];
  album_type: string; // e.g., "album", "single", "compilation"
}

export interface NewReleasesResponse {
  albums: {
    href: string;
    items: AlbumItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}

export interface TrackItem {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  preview_url: string | null;
  duration_ms: number;
  album: { images: { url: string }[] };
}
export interface SongItem {
  id: string;
  title: string;
  artist: string;
  mood: string;
  thumbnailUrl: string;
  audioUrl: string;
}
