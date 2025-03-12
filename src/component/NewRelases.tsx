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
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SongItem } from '../types/moodify';
import { Button } from './Button';

interface SongsProps {
  songs: SongItem[];
}

const NewReleases = ({ songs }: SongsProps) => {
  const [selectedMusic, setSelectedMusic] = useState<SongItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (audioRef.current && songs[currentIndex]?.audioUrl) {
      audioRef.current.src = songs[currentIndex]?.audioUrl;
      audioRef.current.volume = volume;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentIndex, songs]);

  // Set default song and sync index
  useEffect(() => {
    if (songs.length > 0) {
      setSelectedMusic(songs[currentIndex] || songs[0]);
      setCurrentIndex(songs.length > 0 ? currentIndex : 0); // Reset index if out of bounds
      console.log('currentIndex-Before', currentIndex);

      if (audioRef.current && songs[currentIndex]?.audioUrl) {
        audioRef.current.src = songs[currentIndex].audioUrl;
        console.log('currentIndex-After', currentIndex);
        if (isPlaying) audioRef.current.play();
      }
    }
  }, [songs, currentIndex, isPlaying]);

  // Handle thumbnail click
  const handleSelectedMusic = (id: number) => {
    const newIndex = songs.findIndex((song) => song.id === id);
    console.log('newIndex', newIndex);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
      setSelectedMusic(songs[newIndex]);
      if (audioRef.current) {
        audioRef.current.src = songs[newIndex].audioUrl;
        audioRef.current.volume = volume; // Keep volume consistent
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (volume === 0) {
          // If muted, unmute before playing
          audioRef.current.volume = 1;
          setVolume(1);
        }
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Previous song
  const handlePrev = () => {
    if (songs.length > 0) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
      setCurrentIndex(newIndex);
      setSelectedMusic(songs[newIndex]);
      if (audioRef.current) {
        audioRef.current.src = songs[newIndex].audioUrl;
        audioRef.current.volume = volume; // Keep volume consistent
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Next song
  const handleNext = () => {
    if (songs.length > 0) {
      const newIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
      setSelectedMusic(songs[newIndex]);
      if (audioRef.current) {
        audioRef.current.src = songs[newIndex].audioUrl;
        audioRef.current.play();
        audioRef.current.volume = volume; // Keep volume consistent
        setIsPlaying(true);
      }
    }
  };

  const handleVolume = () => {
    if (audioRef.current) {
      const newVolume = volume === 1 ? 0 : 1; //0: mute
      setVolume(newVolume);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (!isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleFavourite = () => {
    navigate('/favourite');
  };

  return (
    <div className="flex flex-col md:gap-4 mx-6">
      {/* main slide */}
      <div className="flex">
        {selectedMusic ? (
          <div className="flex w-full">
            <img
              src={
                selectedMusic.thumbnailUrl ||
                'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww'
              }
              alt={selectedMusic.title}
              className="w-1/2 h-auto"
            />
            <div className="w-1/2 h-auto bg-gradient-to-r from-secondary-text-light via-secondary-text-dim to-secondary-dark text-secondary-text-dim p-6">
              <p className="text-white">{selectedMusic.title}</p>
              <h3 className="font-bold text-white">{selectedMusic.artist}</h3>
              <p className="text-secondary-text-dim">{selectedMusic.genre}</p>
              <p className="text-secondary-text-dim">{selectedMusic.mood}</p>
            </div>
          </div>
        ) : (
          <p className="w-full text-center">No song selected</p>
        )}
      </div>
      <div className="flex justify-between flex-shrink-0 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark w-full p-3 rounded-lg shadow-md">
        {/* Controllers */}
        <div className="flex">
          <img
            className="w-8 h-8 rounded-md mr-2"
            src={
              selectedMusic?.thumbnailUrl ||
              'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww'
            }
          />
          <div>
            <h3 className="font-bold">{selectedMusic?.title || 'No title'}</h3>
            <p className="text-sm">{selectedMusic?.artist || 'No artist'}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button variant="default" size="icon" onClick={handlePrev}>
            <ChevronLeft />
          </Button>
          <Button variant="default" size="icon" onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="default" size="icon" onClick={handleNext}>
            <ChevronRight />
          </Button>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button variant="default" size="icon">
            {volume ? (
              <Volume2 onClick={handleVolume} />
            ) : (
              <VolumeOff onClick={handleVolume} />
            )}
          </Button>
          <Button variant="default" size="icon">
            <Heart onClick={handleFavourite} />
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
                onClick={() => handleSelectedMusic(song.id)}
                className={`w-full h-full object-cover cursor-pointer ${
                  song.id === selectedMusic?.id
                    ? 'border-2 border-green-500'
                    : ''
                }`}
              />
            </div>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default NewReleases;
