import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeOff,
} from 'lucide-react';
import { useMoodify } from '../hooks/useMoodify';
import { formatTime } from '../utils/formatTime';
import { Button } from './Button';

const CurrentSong = () => {
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
  } = useMoodify();

  const handlePrev = () => {
    if (!currentSong) return;
    const currentIndex = thumbnailSongs.findIndex(
      (s) => s.id === currentSong.id
    );
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : thumbnailSongs.length - 1;
    playSong(thumbnailSongs[newIndex]);
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = thumbnailSongs.findIndex(
      (s) => s.id === currentSong.id
    );
    const newIndex =
      currentIndex < thumbnailSongs.length - 1 ? currentIndex + 1 : 0;
    playSong(thumbnailSongs[newIndex]);
  };

  const handleVolume = () => {
    setVolume(volume === 1 ? 0 : 1);
  };

  return (
    <div className="flex flex-col gap-4 mx-4  h-full">
      <div className="top-24 z-10">
        {currentSong ? (
          <div className="flex w-full">
            <img
              src={currentSong.thumbnailUrl || '...'}
              alt={currentSong.title}
              className="w-full md:w-full h-full object-cover"
            />
            <div className="hidden md:block w-1/2 bg-gradient-to-r from-secondary-text-light via-secondary-text-dim to-secondary-dark p-6">
              <h2 className="text-white">Title: {currentSong.title}</h2>
              <h4 className="font-bold text-white">
                Artist: {currentSong.artist}
              </h4>
              <p className="text-white">Duration: {currentSong.duration}</p>
              <p className="text-white">
                Mood: {currentSong.mood || 'Unknown'}
              </p>
              <p className="text-white">
                Genre: {currentSong.genre || 'Unknown'}
              </p>
            </div>
          </div>
        ) : (
          <p className="w-full text-center text-white">No song selected</p>
        )}
      </div>

      {/* Controllers */}
      <div
        className={`flex flex-col md:flex-row md:justify-between items-center gap-4 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'} w-full p-3 rounded-lg`}
      >
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-md"
            src={currentSong?.thumbnailUrl || '...'}
          />
          <div>
            <h3
              className={`font-bold ${theme === 'dark' ? 'text-secondary-text-light' : 'text-secondary-text-dim'}`}
            >
              {currentSong?.title || 'No title'}
            </h3>
            <p
              className={`text-sm ${theme === 'dark' ? 'text-secondary-text-light' : 'text-secondary-text-dim'}`}
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
            className={`border  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
            disabled={!currentSong || thumbnailSongs.length === 0}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={togglePlayPause}
            className={`border ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
            disabled={!currentSong}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handleNext}
            className={`border  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
            disabled={!currentSong || thumbnailSongs.length === 0}
          >
            <ChevronRight />
          </Button>
        </div>
        <div
          className={`p-2  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dark'}  transition-colors duration-300 group-hover:bg-secondary-text-dim`}
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
            className={`border ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
            disabled={!currentSong}
          >
            {volume ? <Volume2 /> : <VolumeOff />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrentSong;
