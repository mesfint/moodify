import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Heart,
  Pause,
  Play,
  Volume2,
  VolumeOff,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoodify } from '../hooks/useMoodify';
import { SongItem } from '../types/moodify';
import { formatTime } from '../utils/formatTime';
import { Button } from './Button';

interface NewRelasesProps {
  songs: SongItem[];
  onAddFavourite: (song: SongItem) => void;
  addToPlayLists: (song: SongItem, playlistId: string) => void;
}

const NewReleases = ({ songs, onAddFavourite }: NewRelasesProps) => {
  const {
    currentSong,
    isPlaying,
    volume,
    playSong,
    thumbnailSongs,
    togglePlayPause,
    setVolume,
    currentTime,
    theme,
    addToPlayLists,
    playlists,
  } = useMoodify();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  const [expandedSongId, setExpandedSongId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handlePrev = () => {
    const currentIndex = thumbnailSongs.findIndex(
      (s) => s.id === currentSong?.id
    );
    const newIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    playSong(thumbnailSongs[newIndex]);
  };

  const handleNext = () => {
    const currentIndex = thumbnailSongs.findIndex(
      (s) => s.id === currentSong?.id
    );
    const newIndex =
      currentIndex < thumbnailSongs.length - 1 ? currentIndex + 1 : 0;
    playSong(thumbnailSongs[newIndex]);
  };

  const handleVolume = () => {
    setVolume(volume === 1 ? 0 : 1);
  };

  const handleAddToPlaylist = (song: SongItem, playlistId: string) => {
    addToPlayLists(song, playlistId);
    setExpandedSongId(null);
  };

  return (
    <div className="flex flex-col gap-4 mx-4 h-full">
      <div className="top-24 z-10">
        {currentSong ? (
          <div
            className="flex w-full cursor-pointer"
            onClick={() => navigate(`/songs/${currentSong.id}`)}
          >
            <img
              src={currentSong.thumbnailUrl || '...'}
              alt={currentSong.title}
              className="w-full md:w-1/2  h-64 object-cover"
            />
            <div className="hidden md:block w-1/2 bg-gradient-to-r from-secondary-text-light via-secondary-text-dim to-secondary-dark p-6">
              <p className="text-white">{currentSong.title}</p>
              <h3 className="font-bold text-white">{currentSong.artist}</h3>
            </div>
          </div>
        ) : (
          <p className="w-full text-center text-white">No song selected</p>
        )}
      </div>
      {/* Controllers */}
      <div
        className={`flex flex-col md:z-1 md:flex-row md:justify-between items-center gap-4 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'} w-full p-3 rounded-lg `}
      >
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-md"
            src={currentSong?.thumbnailUrl || '...'}
          />
          <div>
            <h3
              className={`font-bold ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
            >
              {currentSong?.title || 'No title'}
            </h3>
            <p
              className={`text-sm ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
            >
              {currentSong?.artist || 'No artist'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="icon"
            onClick={handlePrev}
            className={`border cursor-pointer  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={togglePlayPause}
            className={`border cursor-pointer ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handleNext}
            className={`border cursor-pointer ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            <ChevronRight />
          </Button>
        </div>
        <div
          className={`  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
        >
          {isPlaying
            ? formatTime(currentTime)
            : currentSong?.duration || '0:00'}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="icon"
            onClick={handleVolume}
            tooltip={volume ? 'Mute' : 'Unmute'}
            className={`border cursor-pointer ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            {volume ? <Volume2 /> : <VolumeOff />}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={() => currentSong && onAddFavourite(currentSong)}
            tooltip="Add to Favorites"
            disabled={!currentSong}
            className={`border cursor-pointer ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            <Heart />
          </Button>
        </div>
      </div>
      {/* Song Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {songs.map((song) => (
          <div
            key={song.id}
            className={` rounded-t-lg overflow-hidden ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'} group`}
          >
            <div className="relative">
              <Button
                className={`absolute bg-transparent top-2  right-2  flex items-center justify-center border-1 ${theme === 'dark' ? 'border-white ' : ' border-black '} rounded-full md:w-10 md:h-10 w-8 h-8  cursor-pointer`}
                onClick={() =>
                  setExpandedSongId(expandedSongId === song.id ? null : song.id)
                }
              >
                <EllipsisVertical
                  size={32}
                  fill={` ${theme === 'dark' ? 'border-white ' : ' border-black '}`}
                />
              </Button>

              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="w-full h-40 object-cover "
              />

              {expandedSongId === song.id && (
                <div
                  className={`absolute right-0 top-10 mt-2 w-40 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}  shadow-lg z-20`}
                >
                  <ul className="py-2">
                    <p className="py-2 px-4 text-sm">Add to playlist</p>
                    {playlists.length > 0 ? (
                      playlists.map((playlist) => (
                        <li
                          key={playlist.id}
                          className="px-4 py-2 hover:bg-secondary-dark-hover cursor-pointer"
                          onClick={() => handleAddToPlaylist(song, playlist.id)}
                        >
                          {playlist.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">No playlists</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div
              className={`p-2  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dark'}  transition-colors duration-300 group-hover:bg-secondary-text-dim`}
            >
              <p
                className={`font-bold  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
              >
                {song.title}
              </p>
              <p
                className={`text-sm  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
              >
                {song.artist}
              </p>
            </div>
            <Button
              className="absolute left-1/2 transform -translate-x-1/2 bottom-0 flex items-center justify-center rounded-full w-12 h-12 bg-green-500  opacity-0 group-hover:opacity-100 group-hover:bottom-16 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => playSong(song)}
            >
              <Play size={32} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
