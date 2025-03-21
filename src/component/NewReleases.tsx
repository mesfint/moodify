import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Heart,
  Pause,
  Play,
  Plus,
  Volume2,
  VolumeOff,
} from 'lucide-react';
import { useState } from 'react';
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

  const handleAddToPlaylist = () => {
    if (currentSong && selectedPlaylistId) {
      addToPlayLists(currentSong, selectedPlaylistId);
      setSelectedPlaylistId('');
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-4 h-full">
      <div className="top-24 z-10">
        {currentSong ? (
          <div className="flex w-full  ">
            <img
              src={currentSong.thumbnailUrl || '...'}
              alt={currentSong.title}
              className="w-full md:w-1/2  h-64 object-cover"
            />
            <div className="hidden md:block w-1/2 bg-gradient-to-r from-secondary-text-light via-secondary-text-dim to-secondary-dark p-6">
              <p className="text-white">{currentSong.title}</p>
              <h3 className="font-bold text-white">{currentSong.artist}</h3>
              <select
                value={selectedPlaylistId}
                onChange={(e) => setSelectedPlaylistId(e.target.value)}
                className="p-2 rounded bg-secondary-dark text-white"
              >
                <option value="">Select a playlist</option>
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
              <Button
                variant="default"
                size="medium"
                onClick={handleAddToPlaylist}
                disabled={!selectedPlaylistId || !currentSong}
              >
                <Plus />
                <span>Add to Playlist</span>
              </Button>
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
            className={`border-1  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={togglePlayPause}
            className={`border-1 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handleNext}
            className={` border-1 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="text-white">
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
            className={`border-1 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            {volume ? <Volume2 /> : <VolumeOff />}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={() => currentSong && onAddFavourite(currentSong)}
            tooltip="Add to Favorites"
            disabled={!currentSong}
            className={`border-1 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          >
            <Heart />
          </Button>
          <Button
            variant="default"
            size="icon"
            className={`border-1 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'} `}
          >
            <EllipsisVertical />
          </Button>
        </div>
      </div>
      {/* Song Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`relative rounded-t-lg overflow-hidden ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'} group`}
          >
            <img
              src={song.thumbnailUrl}
              alt={song.title}
              className="w-full h-40 object-cover "
            />
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
