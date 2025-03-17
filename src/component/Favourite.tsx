import { MoveDown, MoveUp, Pause, Play, Search, Trash2 } from 'lucide-react';
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
  } = useMoodify();

  const filteredFavourite = searchTerm
    ? favourites.filter((fav) =>
        fav.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : favourites;

  // sort by artist
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
      if (isPlaying) {
        pauseSong();
      } else {
        playSong(song);
      }
    } else {
      // New song clicked—play it
      playSong(song);
    }
  };
  return (
    <>
      {/* Search Form */}
      <div className="flex flex-col xs:flex-1 md:justify-end md:items-end mx-4 mb-4">
        <form className=" relative mx-4 w-56">
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
      <table className="table-auto w-full text-left gap-2 ">
        <thead>
          <tr>
            <th className="px-2  hidden md:table-cell">Song</th>
            <th className="px-2  ">
              <Button
                variant="default"
                size="icon"
                tooltip={sortDirection === 'asc' ? 'Z-A' : 'A-Z'}
                onClick={handleSort}
                className="ml-2"
              >
                {sortDirection === 'asc' ? <MoveUp /> : <MoveDown />}
              </Button>
              Artist
            </th>
            <th className="px-2 ">Title</th>
            {/* <th>
              <Button onClick={sortByName}>{<ArrowUpDown />}</Button>
            </th> */}
            <th className="px-2 ">Play/Pause</th>
            <th className="px-2 ">Operation</th>
            <th className="px-2 ">Time</th>
          </tr>
        </thead>
        <tr>
          <td colSpan={6}>
            <hr className="h-px my-4  border-0 dark:bg-neutral-800 w-full" />
          </td>
        </tr>
        <tbody>
          {sortedFavourites.length > 0 ? (
            sortedFavourites.map((fav) => (
              <tr
                key={fav.id}
                className={
                  currentSong?.id === fav.id && isPlaying
                    ? 'bg-secondary-text-dim'
                    : 'bg-none'
                }
              >
                <td className="hidden md:table-cell">
                  <img
                    className="w-8 h-8     rounded-md mr-2"
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
                  >
                    {currentSong?.id === fav.id && isPlaying ? (
                      <Pause />
                    ) : (
                      <Play />
                    )}
                  </Button>
                </td>
                <td>
                  <Button variant="default" size="icon">
                    <Trash2
                      className="text-red-600 cursor-pointer"
                      onClick={() => removeFromFavorites(fav.id)}
                    />
                  </Button>
                </td>
                <td>
                  {currentSong?.id === fav.id && isPlaying
                    ? formatTime(currentTime)
                    : fav.duration}
                </td>
              </tr>
            ))
          ) : (
            <tr className="col-span-10">
              <td>No Fav song Yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Favourite;
