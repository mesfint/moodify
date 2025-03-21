import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moods, songData } from '../data/songs';
import { fetchProfile, initiateLogin } from '../services/auth-service';
import { Categories, SongItem } from '../types/moodify';
import { UserProfile } from '../types/spotify';
import { parseDurationToSeconds } from '../utils/convertToMMSS';
import { getRandomBGcolors, getRandomSongs } from '../utils/random';

interface Playlist {
  id: string;
  name: string;
  songs: SongItem[];
  bgColor?: string;
}

interface MoodifyContextType {
  profile: UserProfile | null;
  setProfile: () => void;
  songs: SongItem[];
  favourites: SongItem[];
  moods: Categories[];
  selectedMood: Categories;
  thumbnailSongs: SongItem[];
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  currentSong: SongItem | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  notification: { message: string; visible: boolean };
  addToFavorites: (song: SongItem) => void;
  removeFromFavorites: (id: number) => void;
  setSelectedMood: (mood: Categories) => void;
  logout: () => void;
  login: () => void;
  playSong: (song: SongItem) => void;
  pauseSong: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  theme: 'dark' | 'light';
  toggleTheme: (theme: string) => void;
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addToPlayLists: (song: SongItem, playlistId: string) => void;
  removeFromPlayLists: (id: number, playlistId: string) => void;
  deletePlaylist: (id: string) => void;
}

const defaultContext: MoodifyContextType = {
  profile: null,
  setProfile: () => {},
  songs: [],
  favourites: [],
  moods: [],
  selectedMood: 'All',
  thumbnailSongs: [],
  accessToken: null,
  setAccessToken: () => {},
  currentSong: null,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  notification: { message: '', visible: false },
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  setSelectedMood: () => {},
  logout: () => {},
  login: () => {},
  playSong: () => {},
  pauseSong: () => {},
  togglePlayPause: () => {},
  setVolume: () => {},
  theme: 'dark',
  toggleTheme: () => {},
  playlists: [],
  createPlaylist: () => {},
  addToPlayLists: () => {},
  removeFromPlayLists: () => {},
  deletePlaylist: () => {},
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
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const storedPlaylists = localStorage.getItem('playlists');
    return storedPlaylists ? JSON.parse(storedPlaylists) : [];
  });

  const [moods] = useState(Moods);
  const [selectedMood, setSelectedMood] = useState<Categories>('All');
  const [thumbnailSongs, setThumbnailSongs] = useState<SongItem[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  const [currentSong, setCurrentSong] = useState<SongItem | null>(null);

  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({ message: '', visible: false });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const audioRef = useRef<HTMLAudioElement>(new Audio()); //avoids <audio></audio>
  const navigate = useNavigate();

  // Fetch profile when accessToken changes
  useEffect(() => {
    const fetchAndSetProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (token && !profile) {
        console.log('Fetching profile with token:', token);

        // Only fetch if we don’t already have a profile
        try {
          setAccessToken(token);
          const profileData = await fetchProfile(token);
          console.log('Profile set:', profileData);
          setProfile(profileData);
          navigate('/');
        } catch (error) {
          console.error('Error fetching profile:', error);
          setAccessToken(null);
          localStorage.removeItem('access_token');
        }
      }
    };
    fetchAndSetProfile();
  }, [accessToken]);

  useEffect(() => {
    console.log('accessToken changed:', accessToken);
  }, [accessToken]);

  useEffect(() => {
    console.log('profile changed:', profile);
  }, [profile]);

  // useEffect(() => {
  //   const filteredSongs =
  //     selectedMood === 'All'
  //       ? getRandomSongs(songs, 4)
  //       : songs.filter((song) => song.mood === selectedMood).slice(0, 4);
  //   setThumbnailSongs(filteredSongs);

  //   if (filteredSongs.length > 0 && !currentSong) {
  //     setCurrentSong(filteredSongs[0]);
  //     if (audioRef.current) {
  //       audioRef.current.src = filteredSongs[0].audioUrl; //Preload audio
  //       audioRef.current.volume = volume;
  //     }
  //   }
  // }, [selectedMood, songs]);
  useEffect(() => {
    const filteredSongs =
      selectedMood === 'All'
        ? getRandomSongs(songs, 4)
        : songs.filter((song) => song.mood === selectedMood).slice(0, 4);
    setThumbnailSongs(filteredSongs);
    if (filteredSongs.length > 0 && !currentSong) {
      setCurrentSong(filteredSongs[0]);
      setCurrentTime(parseDurationToSeconds(filteredSongs[0].duration)); // Preload time
      if (audioRef.current) {
        audioRef.current.src = filteredSongs[0].audioUrl;
        audioRef.current.volume = volume;
        // Auto-play attempt (might fail due to policy)
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Auto-play blocked:', error);
            setIsPlaying(false); // Ready for manual play
          });
      }
    }
  }, [selectedMood, songs]);

  //Time Countdown Effect
  useEffect(() => {
    if (isPlaying && volume && currentSong) {
      const interval = setInterval(() => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
          setCurrentTime(
            Math.floor(audioRef.current.duration - audioRef.current.currentTime)
          );
        }
      }, 1000);
      return () => clearInterval(interval);
    } // Only loop when current song ends
    if (isPlaying && currentTime === 0 && currentSong) {
      const currentIndex = favourites.findIndex((s) => s.id === currentSong.id);
      if (currentIndex !== -1) {
        const newIndex =
          currentIndex < favourites.length - 1 ? currentIndex + 1 : 0;
        playSong(favourites[newIndex]);
      } else {
        const currentThumbIndex = thumbnailSongs.findIndex(
          (s) => s.id === currentSong.id
        );
        if (currentThumbIndex !== -1) {
          const newThumbIndex =
            currentThumbIndex < thumbnailSongs.length - 1
              ? currentThumbIndex + 1
              : 0;
          playSong(thumbnailSongs[newThumbIndex]);
        }
      }
    }
  }, [isPlaying, volume, currentSong, favourites, thumbnailSongs]);

  const notify = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => setNotification({ message: '', visible: false }), 2300);
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const addToFavorites = (song: SongItem) => {
    if (!favourites.some((fav) => fav.id === song.id)) {
      const updatedFavourites = [song, ...favourites];
      setFavourites(updatedFavourites);
      localStorage.setItem('favSongs', JSON.stringify(updatedFavourites));
      notify(updatedFavourites && `Added ${song.title} to your Favourites`);
    }
  };

  const removeFromFavorites = (id: number) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== id);
    setFavourites(updatedFavourites);
    localStorage.setItem('favSongs', JSON.stringify(updatedFavourites));
  };

  const createPlaylist = (name: string) => {
    const randomColor = getRandomBGcolors([
      '#FF6F61',
      '#6B7280',
      '#FFD700',
      '#4B0082',
      '#00CED1',
      '#FF1493',
      '#32CD32',
      '#FFA500',
      '#4682B4',
      '#8A2BE2',
    ]);
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: [],
      bgColor: randomColor,
    };
    const updatedPlayLists = [newPlaylist, ...playlists];
    setPlaylists(updatedPlayLists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlayLists));
    notify(`Created playlist: ${name}`);
  };
  const addToPlayLists = (song: SongItem, playlistId: string) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId &&
      !playlist.songs.some((s) => s.id === song.id)
        ? { ...playlist, songs: [song, ...playlist.songs] }
        : playlist
    );
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    notify(`Added ${song.title} to playlist`);
  };
  // remove songs from playlists
  const removeFromPlayLists = (id: number, playlistId: string) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId
        ? {
            ...playlist,
            songs: playlist.songs.filter((song) => song.id !== id),
          }
        : playlist
    );
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
  };
  // remove playlists
  const deletePlaylist = (id: string) => {
    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
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
          setCurrentTime(parseDurationToSeconds(song.duration));
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
      setCurrentTime(
        Math.floor(audioRef.current.duration - audioRef.current.currentTime)
      ); //save spot
      setIsPlaying(false);
    }
  };
  const togglePlayPause = () => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        audioRef.current.volume = volume;
        audioRef.current.currentTime = audioRef.current.duration - currentTime; // Resume from spot
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error('Error resuming:', error));
      }
    }
  };

  // const togglePlayPause = () => {
  //   if (audioRef.current && currentSong) {
  //     if (isPlaying) {
  //       pauseSong();
  //     } else {
  //       audioRef.current.src = currentSong.audioUrl;
  //       audioRef.current.volume = volume;
  //       //continue authematically play for next song onclick
  //       //audioRef.current.currentTime = audioRef.current.duration - currentTime; // Resume from spot
  //       audioRef.current
  //         .play()
  //         .then(() => setIsPlaying(true))
  //         .catch((error) => console.error('Error', error));
  //       setIsPlaying(true);
  //       setCurrentTime(parseDurationToSeconds(currentSong.duration));
  //     }
  //   }
  // };

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
    navigate('/');
  };

  const login = () => {
    initiateLogin();
  };

  return (
    <MoodifyContext.Provider
      value={{
        profile,
        setProfile,
        songs,
        favourites,
        moods,
        selectedMood,
        thumbnailSongs,
        accessToken,
        currentSong,
        isPlaying,
        volume,
        currentTime,
        notification,
        addToFavorites,
        removeFromFavorites,
        setSelectedMood,
        logout,
        login,
        playSong,
        pauseSong,
        togglePlayPause,
        setVolume,
        theme,
        toggleTheme,
        playlists,
        createPlaylist,
        addToPlayLists,
        removeFromPlayLists,
        deletePlaylist,
      }}
    >
      {children}
    </MoodifyContext.Provider>
  );
};
