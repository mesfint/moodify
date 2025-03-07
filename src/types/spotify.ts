export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
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
