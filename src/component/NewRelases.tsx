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
import { useMoodify } from '../hooks/useMoodify';
import { SongItem } from '../types/moodify';
import { formatTime } from '../utils/formatTime';
import { Button } from './Button';

interface NewRelasesProps {
  songs: SongItem[];
  onAddFavourite: (song: SongItem) => void;
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
  } = useMoodify();

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

  return (
    <div className="flex flex-col gap-4 mx-6">
      <div className="flex w-full">
        {currentSong ? (
          <div className="flex w-full ">
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
      <div className="flex flex-col md:z-1 md:flex-row md:justify-between items-center gap-4 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark w-full p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-md"
            src={currentSong?.thumbnailUrl || '...'}
          />
          <div>
            <h3 className="font-bold text-white">
              {currentSong?.title || 'No title'}
            </h3>
            <p className="text-sm text-gray-300">
              {currentSong?.artist || 'No artist'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="icon" onClick={handlePrev}>
            <ChevronLeft />
          </Button>
          <Button variant="default" size="icon" onClick={togglePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="default" size="icon" onClick={handleNext}>
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
          >
            {volume ? <Volume2 /> : <VolumeOff />}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={() => currentSong && onAddFavourite(currentSong)}
            tooltip="Add to Favorites"
            disabled={!currentSong}
          >
            <Heart />
          </Button>
          <Button variant="default" size="icon">
            <EllipsisVertical />
          </Button>
        </div>
      </div>
      {/* Song Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {songs.map((song) => (
          <div
            key={song.id}
            className="relative rounded-t-lg overflow-hidden bg-secondary-dark group"
          >
            <img
              src={song.thumbnailUrl}
              alt={song.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 bg-secondary-dark text-white transition-colors duration-300 group-hover:bg-secondary-text-dim">
              <p className="font-bold">{song.title}</p>
              <p className="text-sm text-gray-300">{song.artist}</p>
            </div>
            <button
              className="absolute left-1/2 transform -translate-x-1/2 bottom-0 flex items-center justify-center rounded-full w-12 h-12 bg-green-500 text-secondary-dark opacity-0 group-hover:opacity-100 group-hover:bottom-16 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => playSong(song)}
            >
              <Play size={32} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
