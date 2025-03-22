import {
  Clock,
  MoveDown,
  MoveUp,
  Pause,
  Play,
  Search,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { useMoodify } from '../hooks/useMoodify';
import { SongItem } from '../types/moodify';
import { formatTime } from '../utils/formatTime';
import { Button } from './Button';

const Favourite = () => {
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  );

  const {
    favourites,
    removeFromFavorites,
    isPlaying,
    playSong,
    pauseSong,
    currentSong,
    currentTime,
    theme,
  } = useMoodify();

  const filteredFavourite = searchTerm
    ? favourites.filter((fav) =>
        fav.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : favourites;

  const sortedFavourites = sortDirection
    ? [...filteredFavourite].sort((a, b) =>
        sortDirection === 'asc'
          ? a.artist.localeCompare(b.artist)
          : b.artist.localeCompare(a.artist)
      )
    : filteredFavourite;

  const handleSort = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleTogglePlay = (song: SongItem) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) pauseSong();
      else playSong(song);
    } else {
      playSong(song);
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-4">
      {/* Search Form */}
      <div className="flex justify-end mb-2">
        <form className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text-light" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 text-sm border border-secondary-border rounded-full text-secondary-text-light bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
        </form>
      </div>

      <table className="w-full text-left table-fixed">
        <thead>
          <tr
            className={
              theme === 'dark'
                ? 'text-secondary-text-light'
                : 'text-secondary-text-dim'
            }
          >
            {' '}
            <th className="px-2 hidden md:table-cell">Song</th>
            <th className="px-2">
              <Button
                variant="default"
                size="icon"
                tooltip={sortDirection === 'asc' ? 'Z-A' : 'A-Z'}
                onClick={handleSort}
                className={
                  theme === 'dark'
                    ? 'bg-secondary-text-dim text-secondary-text-light'
                    : ' bg-white text-secondary-text-dim'
                } // Theme on Button
              >
                {sortDirection === 'asc' ? <MoveUp /> : <MoveDown />}
              </Button>
              Artist
            </th>
            <th className="w-1/4 px-2">Title</th>
            <th className="w-12 px-2">Play</th>
            <th className="w-12 px-2">Delete</th>
            <th className="w-16 px-2">
              <Button variant="ghost" size="icon" tooltip="duration">
                <Clock />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6}>
              <hr className="my-4 border-0 dark:bg-neutral-800" />
            </td>
          </tr>
          {sortedFavourites.length > 0 ? (
            sortedFavourites.map((fav) => (
              <tr
                key={fav.id}
                className={
                  currentSong?.id === fav.id && isPlaying
                    ? 'bg-secondary-text-dim'
                    : theme === 'dark'
                      ? 'text-secondary-text-light'
                      : 'text-secondary-text-dim'
                }
              >
                <td className="hidden md:table-cell">
                  <img
                    className="w-8 h-8 rounded-md mr-2"
                    src={fav.thumbnailUrl}
                  />
                </td>
                <td className="text-wrap">{fav.artist}</td>
                <td>{fav.title}</td>
                <td>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => handleTogglePlay(fav)}
                    className={`bg-white border-1 mb-2 cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-secondary-text-dim'
                        : 'text-secondary-text-dim'
                    }`}
                  >
                    {currentSong?.id === fav.id && isPlaying ? (
                      <Pause />
                    ) : (
                      <Play />
                    )}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="default"
                    size="icon"
                    className={` cursor-pointer border-1   ${
                      theme === 'dark'
                        ? 'hover:bg-secondary-text-dim  text-secondary-text-light'
                        : 'bg-white hover:bg-secondary-text-light text-secondary-text-dim'
                    }`}
                    onClick={() => removeFromFavorites(fav.id)}
                  >
                    <Trash2 />
                  </Button>
                </td>
                <td className="text-center">
                  <span className="inline-block w-12 text-center">
                    {currentSong?.id === fav.id && isPlaying
                      ? formatTime(currentTime)
                      : fav.duration}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className={
                  theme === 'dark'
                    ? 'text-secondary-text-light'
                    : 'text-secondary-text-dim'
                }
              >
                {' '}
                {/* Added theme */}
                No Fav song Yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Favourite;
