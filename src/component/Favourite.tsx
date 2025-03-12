import { Play, Trash2 } from 'lucide-react';
import { SongItem } from '../types/moodify';
import { Button } from './Button';

interface FavouriteProps {
  favourites: SongItem[];
  onRemoveFavourite: (id: number) => void;
}

const Favourite = ({ favourites, onRemoveFavourite }: FavouriteProps) => {
  return (
    <>
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
              <tr key={fav.id}>
                <td>
                  <img
                    className="w-8 h-8 rounded-md mr-2"
                    src={fav.thumbnailUrl}
                  />
                </td>
                <td>{fav.artist}</td>
                <td>{fav.title}</td>
                <td>
                  <Button variant="default" size="icon">
                    <Play />
                  </Button>
                </td>
                <td>
                  <Button variant="default" size="icon">
                    <Trash2
                      className="text-red-600 cursor-pointer"
                      onClick={() => onRemoveFavourite(fav.id)}
                    />
                  </Button>
                </td>
                <td>{fav.duration}</td>
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
