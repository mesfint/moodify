import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { Moods, songData } from '../data/songs';
import { fetchProfile, initiateLogin } from '../services/auth-service';
import { Categories, SongItem } from '../types/moodify';
import { UserProfile } from '../types/spotify';
import { getRandomSongs } from '../utils/random';

interface MoodifyContextType {
  profile: UserProfile | null;
  songs: SongItem[];
  favourites: SongItem[];
  moods: Categories[];
  selectedMood: Categories;
  thumbnailSongs: SongItem[];
  accessToken: string | null;
  currentSong: SongItem | null;
  isPlaying: boolean;
  volume: number;
  addToFavorites: (song: SongItem) => void;
  removeFromFavorites: (id: number) => void;
  setSelectedMood: (mood: Categories) => void;
  logout: () => void;
  login: () => void;
  playSong: (song: SongItem) => void;
  pauseSong: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
}

const defaultContext: MoodifyContextType = {
  profile: null,
  songs: [],
  favourites: [],
  moods: [],
  selectedMood: 'All',
  thumbnailSongs: [],
  accessToken: null,
  currentSong: null,
  isPlaying: false,
  volume: 1,
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  setSelectedMood: () => {},
  logout: () => {},
  login: () => {},
  playSong: () => {},
  pauseSong: () => {},
  togglePlayPause: () => {},
  setVolume: () => {},
};

//create context
export const MoodifyContext = createContext<MoodifyContextType>(defaultContext);

interface MoodifyProviderProps {
  children: ReactNode;
}

export const MoodifyProvider = ({ children }: MoodifyProviderProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [songs] = useState(songData as SongItem[]);
  const [favourites, setFavourites] = useState<SongItem[]>(() => {
    const storedFavs = localStorage.getItem('favSongs');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });
  const [moods] = useState(Moods);
  const [selectedMood, setSelectedMood] = useState<Categories>('All');
  const [thumbnailSongs, setThumbnailSongs] = useState<SongItem[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  const [currentSong, setCurrentSong] = useState<SongItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
      const fetchAndSetProfile = async () => {
        try {
          const profileData = await fetchProfile(token);
          setProfile(profileData);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      fetchAndSetProfile();
    }
  }, []);

  useEffect(() => {
    const filteredSongs =
      selectedMood === 'All'
        ? getRandomSongs(songs, 4)
        : songs.filter((song) => song.mood === selectedMood).slice(0, 4);
    setThumbnailSongs(filteredSongs);
    if (filteredSongs.length > 0 && !currentSong) {
      setCurrentSong(filteredSongs[0]);
    }
    if (audioRef.current) {
      audioRef.current.src = filteredSongs[0].audioUrl; //Preload audio
      audioRef.current.volume = volume;
    }
  }, [selectedMood, songs, currentSong]);

  const addToFavorites = (song: SongItem) => {
    if (!favourites.some((fav) => fav.id === song.id)) {
      const updatedFavourites = [song, ...favourites];
      setFavourites(updatedFavourites);
      localStorage.setItem('favSongs', JSON.stringify(updatedFavourites));
    }
  };

  const removeFromFavorites = (id: number) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== id);
    setFavourites(updatedFavourites);
    localStorage.setItem('favSongs', JSON.stringify(updatedFavourites));
  };

  const playSong = (song: SongItem) => {
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setCurrentSong(song);
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error playing song:', error);
          setIsPlaying(false); // Reset if it fails
        });
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (currentSong) {
        audioRef.current.src = currentSong.audioUrl; //refresh the src
        audioRef.current.volume = volume;
        //continue authematically play for next song onclick
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error('Error', error));
        setIsPlaying(true);
      }
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('code_verifier');
    setAccessToken(null);
    setProfile(null);
  };

  const login = () => {
    initiateLogin();
  };

  return (
    <MoodifyContext.Provider
      value={{
        profile,
        songs,
        favourites,
        moods,
        selectedMood,
        thumbnailSongs,
        accessToken,
        currentSong,
        isPlaying,
        volume,
        addToFavorites,
        removeFromFavorites,
        setSelectedMood,
        logout,
        login,
        playSong,
        pauseSong,
        togglePlayPause,
        setVolume,
      }}
    >
      {children}
    </MoodifyContext.Provider>
  );
};
