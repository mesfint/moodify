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
    <div className="flex flex-col md:gap-4 mx-6">
      <div className="flex">
        {currentSong ? (
          <div className="flex w-full">
            <img
              src={currentSong.thumbnailUrl || '...'}
              alt={currentSong.title}
              className="w-1/2 h-64 object-cover"
            />
            <div className="w-1/2 h-auto bg-gradient-to-r from-secondary-text-light via-secondary-text-dim to-secondary-dark text-secondary-text-dim p-6">
              <p className="text-white">{currentSong.title}</p>
              <h3 className="font-bold text-white">{currentSong.artist}</h3>
              <p className="text-secondary-text-dim">{currentSong.genre}</p>
              <p className="text-secondary-text-dim">{currentSong.mood}</p>
            </div>
          </div>
        ) : (
          <p className="w-full text-center">No song selected</p>
        )}
      </div>
      <div className="flex justify-between flex-shrink-0 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark w-full p-3 rounded-lg shadow-md">
        <div className="flex">
          <img
            className="w-8 h-8 rounded-md mr-2"
            src={currentSong?.thumbnailUrl || '...'}
          />
          <div>
            <h3 className="font-bold">{currentSong?.title || 'No title'}</h3>
            <p className="text-sm">{currentSong?.artist || 'No artist'}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
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
        <div className="">
          {' '}
          {/* {currentSong?.id === currentSong?.id && isPlaying
            ? formatTime(currentTime)
            : '0:00'} */}
          {isPlaying ? formatTime(currentTime) : currentSong?.duration}
        </div>

        <div className="flex justify-between items-center gap-2">
          {volume ? (
            <Button variant="default" size="icon" onClick={handleVolume}>
              <Volume2 />
            </Button>
          ) : (
            <Button variant="default" size="icon" onClick={handleVolume}>
              <VolumeOff />
            </Button>
          )}

          <Button
            variant="default"
            size="icon"
            onClick={() => currentSong && onAddFavourite(currentSong)}
            disabled={!currentSong}
          >
            <Heart />
          </Button>
          <Button variant="default" size="icon">
            <EllipsisVertical />
          </Button>
        </div>
      </div>
      <div className="flex gap-4 mx-4 overflow-x-auto justify-center">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div key={song.id} className="w-14 h-14 flex-shrink-0">
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                onClick={() => playSong(song)}
                className={`w-full h-full object-cover cursor-pointer ${song.id === currentSong?.id ? 'border-2 border-green-500' : ''}`}
              />
            </div>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </div>
    </div>
  );
};

export default NewReleases;
