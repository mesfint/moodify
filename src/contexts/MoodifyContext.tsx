import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { Moods, songData } from '../data/songs';
import { Categories, SongItem } from '../types/moodify';
import { parseDurationToSeconds } from '../utils/convertToMMSS';
import { getRandomBGcolors } from '../utils/random';

interface Playlist {
  id: string;
  name: string;
  songs: SongItem[];
  bgColor?: string;
}

interface MoodifyContextType {
  songs: SongItem[];
  favourites: SongItem[];
  moods: Categories[];
  mood: Categories;
  setMood: (mood: Categories) => void;
  thumbnailSongs: SongItem[];
  currentSong: SongItem | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  notify: (message: string) => void;
  notification: { message: string; visible: boolean };
  addToFavorites: (song: SongItem) => void;
  removeFromFavorites: (id: number) => void;
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
  songs: [],
  favourites: [],
  moods: [],
  mood: 'All',
  setMood: () => {},
  thumbnailSongs: [],
  currentSong: null,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  notify: () => {},
  notification: { message: '', visible: false },
  addToFavorites: () => {},
  removeFromFavorites: () => {},
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
  const [mood, setMood] = useState<Categories>('All');
  const [thumbnailSongs, setThumbnailSongs] = useState<SongItem[]>([]);

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

  useEffect(() => {
    const filteredSongs =
      mood === 'All'
        ? songs
        : songs.filter((song) => song.mood === mood).slice(0, 4);
    setThumbnailSongs(filteredSongs);
    // notify('Invalid category, defaulting to All');
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
  }, [mood, songs, currentSong, volume]);

  //Time Countdown & song completion Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && volume && currentSong) {
      interval = setInterval(() => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
          const remainingTime = Math.floor(
            audioRef.current.duration - audioRef.current.currentTime
          );
          setCurrentTime(remainingTime);

          // Check if song has ended
          if (remainingTime <= 0) {
            handleSongEnd();
          }
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, volume, currentSong, favourites, thumbnailSongs]);

  // Handle song ending
  const handleSongEnd = () => {
    if (!currentSong) return;

    // Looping(continous sing) favourites songs
    const currentIndex = favourites.findIndex((s) => s.id === currentSong.id);
    if (currentIndex !== -1 && favourites.length > 1) {
      const newIndex =
        currentIndex < favourites.length - 1 ? currentIndex + 1 : 0;
      playSong(favourites[newIndex]);
      return;
    }

    //  thumbnailSongs Loop
    const currentThumbIndex = thumbnailSongs.findIndex(
      (s) => s.id === currentSong.id
    );
    if (currentThumbIndex !== -1 && thumbnailSongs.length > 1) {
      const newThumbIndex =
        currentThumbIndex < thumbnailSongs.length - 1
          ? currentThumbIndex + 1
          : 0;
      playSong(thumbnailSongs[newThumbIndex]);
      return;
    }

    // No next song: reset current song to start
    setIsPlaying(false);
    setCurrentTime(parseDurationToSeconds(currentSong.duration));
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
    }
  };
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
    notify('Removed a song from your Favourites');
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
    notify('Removed a song from your Playlist');
  };
  // remove playlists
  const deletePlaylist = (id: string) => {
    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    notify(`Removed a playlist`);
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

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <MoodifyContext.Provider
      value={{
        songs,
        favourites,
        moods,
        mood,
        thumbnailSongs,
        currentSong,
        isPlaying,
        volume,
        currentTime,
        notify,
        notification,
        addToFavorites,
        removeFromFavorites,
        setMood,
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
