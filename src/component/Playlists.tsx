import { Pause, PenLine, Play, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMoodify } from '../hooks/useMoodify';
import { SongItem } from '../types/moodify';
import { formatTime } from '../utils/formatTime';
import { Button } from './Button';

const Playlists = () => {
  const {
    playlists,
    createPlaylist,
    removeFromPlayLists,
    deletePlaylist,
    theme,
    currentTime,
    isPlaying,
    currentSong,
    playSong,
    pauseSong,
    notification,
  } = useMoodify();
  const [playlistName, setPlaylistName] = useState('');
  const { playlistId } = useParams();

  const selectedPlaylist = playlists.find((p) => p.id === playlistId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playlistName.trim()) {
      createPlaylist(playlistName);
      setPlaylistName('');
    }
  };
  const handleDeletePlaylist = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    deletePlaylist(id);
  };

  const handleTogglePlay = (song: SongItem) => {
    if (currentSong?.id === song.id) {
      console.log('currentsong', currentSong.id, song.id);
      if (isPlaying) pauseSong();
      else playSong(song);
    } else {
      playSong(song);
    }
  };

  if (playlistId && selectedPlaylist) {
    return (
      <div className="flex flex-col ">
        <h2 className="mx-10 py-2">{selectedPlaylist.name}</h2>
        <table className="w-full">
          <thead>
            <tr>
              {/* <th className="px-2">#</th>
              <th className="px-2">Song</th>
              <th className="px-2">Artist</th>
              <th className="px-2">Duration</th> */}
            </tr>
          </thead>
          <tbody>
            {selectedPlaylist.songs.length > 0 ? (
              selectedPlaylist.songs.map((song, index: number) => (
                <tr
                  className={`
                  ${
                    currentSong?.id === song.id && isPlaying
                      ? 'bg-secondary-text-dim '
                      : theme === 'dark'
                        ? ' text-neutral-100 '
                        : 'text-secondary-text-dim'
                  }`}
                >
                  <div className="flex gap-2 mb-2">
                    <td className="text-md text-center mx-2">{index + 1}</td>
                    <td className="flex gap-4">
                      <img
                        className="w-8 h-8 rounded mt-1"
                        src={song.thumbnailUrl}
                      />
                      <span className="flex  flex-col ">
                        <span
                          className={` text-wrap ${theme === 'dark' && currentSong?.id === song.id && isPlaying ? 'text-secondary-text-light' : 'text-neutral-400'} `}
                        >
                          {song.title}
                        </span>
                        <span
                          className={` text-wrap ${theme === 'dark' && currentSong?.id === song.id && isPlaying ? 'text-secondary-text-light' : 'text-neutral-400'} `}
                        >
                          {song.artist}
                        </span>
                      </span>
                    </td>
                  </div>
                  <td>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => handleTogglePlay(song)}
                      className={`bg-white border-1  cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-secondary-text-dim'
                          : 'text-secondary-text-dim'
                      }`}
                    >
                      {currentSong?.id === song.id && isPlaying ? (
                        <Pause />
                      ) : (
                        <Play />
                      )}
                    </Button>
                  </td>

                  <td className="">
                    <Button
                      variant="default"
                      size="icon"
                      className={` cursor-pointer border-1   ${
                        theme === 'dark'
                          ? 'hover:bg-secondary-text-dim  text-secondary-text-light'
                          : 'bg-white hover:bg-secondary-text-light text-secondary-text-dim'
                      }`}
                      onClick={() => removeFromPlayLists(song.id, playlistId)}
                    >
                      <Trash2 />
                    </Button>
                  </td>

                  <td className="text-center">
                    <span className="inline-block w-12 text-center">
                      {currentSong?.id === song.id && isPlaying
                        ? formatTime(currentTime)
                        : song.duration}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No songs yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-xl font-bold px-2">Create Playlists</h2>
      <form onSubmit={handleSubmit} className="relative w-full md:w-64 flex">
        <PenLine
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text-light"
        />
        <input
          type="text"
          placeholder="Add Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-secondary-border rounded-full text-secondary-text-light bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
        />
        <Button
          variant="ghost"
          size="icon"
          type="submit"
          className="cursor-pointer"
        >
          <span>
            <Plus />
          </span>
        </Button>
      </form>

      {/* Playlist cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {playlists.length > 0 ? (
          playlists.map((playlist) => {
            return (
              <Link
                key={playlist.id}
                className={` relative border p-4 rounded-lg group ${theme === 'dark' ? 'text-secondary-text-light' : 'text-secondary-text-dim'}`}
                style={{ backgroundColor: playlist.bgColor || '#6B7280' }}
                to={`/playlists/${playlist.id}`}
              >
                <span className="font-bold ">{playlist.name}</span>
                <p>
                  ({playlist.songs.length})
                  {playlist.songs.length > 1 ? ' songs ' : ' song '}
                </p>
                <div className="absolute  left-46 top-8">
                  <Button
                    variant="default"
                    size="icon"
                    onClick={(e) => handleDeletePlaylist(e, playlist.id)}
                    className={`cursor-pointer ${
                      theme === 'dark'
                        ? ' bg-secondary-text-dim text-secondary-text-light'
                        : ' bg-white text-secondary-text-dim'
                    }`}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No playlists yet. Create one above!</p>
        )}
      </div>
    </div>
  );
};

export default Playlists;
