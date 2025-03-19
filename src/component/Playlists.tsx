import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMoodify } from '../hooks/useMoodify';
import { Button } from './Button';

const Playlists = () => {
  const { playlists, createPlaylist } = useMoodify(); // Fixed typo: createPlaylist
  const [playlistName, setPlaylistName] = useState('');

  //useParams pulls playlistId from the URL
  const { playlistId } = useParams();

  const selectedPlaylist = playlists.find((p) => p.id === playlistId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playlistName.trim()) {
      createPlaylist(playlistName);
      setPlaylistName('');
    }
  };

  if (playlistId && selectedPlaylist) {
    return (
      <div className="mx-4">
        <h2>{selectedPlaylist.name}</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {selectedPlaylist.songs.length > 0 ? (
              selectedPlaylist.songs.map((song) => (
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.duration}</td>
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
    <div>
      <h2>Playlists</h2>
      <form onSubmit={handleSubmit} className="flex mx-4 w-56">
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
          <Plus />
        </Button>
      </form>
      <div className="mt-4">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} className="my-2">
              <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>{' '}
              {/* Fixed path */}
              <p>{playlist.songs.length} songs</p>
            </div>
          ))
        ) : (
          <p>No playlists yet. Create one above!</p>
        )}
      </div>
    </div>
  );
};

export default Playlists;
