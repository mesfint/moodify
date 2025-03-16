import { Pause, Play, Search, Trash2 } from 'lucide-react';
import { useMoodify } from '../hooks/useMoodify';
import { SongItem } from '../types/moodify';
import { formatTime } from '../utils/formatTime';
import { Button } from './Button';

const Favourite = () => {
  const {
    favourites,
    removeFromFavorites,
    isPlaying,
    playSong,
    pauseSong,
    currentSong,
    currentTime,
  } = useMoodify();

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
      <form className="relative mx-4 w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text-light" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 text-sm border border-secondary-border rounded-full text-secondary-text-light bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
        />
      </form>
      <table className="table-auto w-full text-left gap-2 ">
        <thead className="mb-6">
          <tr className="border-b mb-4">
            <th>Song</th>
            <th>Artist</th>
            <th>Title</th>
            <th>Play/Pause</th>
            <th>Operation</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {favourites.length > 0 ? (
            favourites.map((fav) => (
              <tr
                key={fav.id}
                className={
                  currentSong?.id === fav.id && isPlaying
                    ? 'bg-secondary-text-dim'
                    : 'bg-none'
                }
              >
                <td>
                  <img
                    className="w-8 h-8 rounded-md mr-2"
                    src={fav.thumbnailUrl}
                  />
                </td>
                <td>{fav.artist}</td>
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
