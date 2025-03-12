import { Play, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { SongItem } from '../types/moodify';
import { Button } from './Button';

const songData = [
  {
    id: 1,
    title: 'Pienso Viento',
    genre: 'Ambient',
    mood: 'Calm',
    artist: 'Casa Rosa',
    duration: '2:37',
    thumbnailUrl:
      'https://res.cloudinary.com/ishopit/image/upload/v1741527228/moodify/pienso_viento.png',
    audioUrl:
      'https://res.cloudinary.com/ishopit/video/upload/v1741529064/moodify/audios/pienso_viento.mp3',
  },
  {
    id: 2,
    title: 'Kung Fu Love Tree',
    genre: 'R&B & Soul',
    mood: 'Inspirational',
    artist: 'Jane Smith',
    duration: '2:01',
    thumbnailUrl:
      'https://res.cloudinary.com/ishopit/image/upload/v1741527226/moodify/kung_fu%20_love_tree.png',
    audioUrl:
      'https://res.cloudinary.com/ishopit/video/upload/v1741529049/moodify/audios/Kung%20Fu%20Love%20Tree%20-%20Quincas%20Moreira.mp3',
  },
];

const Favourite = () => {
  const [initialFavorites, setInitialFavorites] =
    useState<SongItem[]>(songData);

  const handleDeletefav = (id: number) => {
    const remainingSongs = initialFavorites.filter((fav) => fav.id !== id);

    console.log('remaining-songs', initialFavorites, remainingSongs);
    setInitialFavorites(remainingSongs);
  };

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
          {initialFavorites.length > 0 ? (
            initialFavorites.map((fav) => (
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
                      onClick={() => handleDeletefav(fav.id)}
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
