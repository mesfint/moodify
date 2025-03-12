import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Callback from './component/Callback';
import Favourite from './component/Favourite';
import { Moods, songData } from './data/songs';
import Home from './pages/Home';
import Layout from './pages/Layout';
import { fetchProfile, initiateLogin } from './services/auth-service';
import { Categories, SongItem } from './types/moodify';
import { UserProfile } from './types/spotify';
import { getRandomSongs } from './utils/random';

const App = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [songs, setSongs] = useState<SongItem[]>(songData as SongItem[]);
  const [moods, setMoods] = useState(Moods);

  const [selectedMood, setSelectedMood] = useState<Categories>('All');
  const [thumbnailSongs, setThumbnailSongs] = useState<SongItem[]>([]);
  const [favourites, setFavourites] = useState<SongItem[]>(songData);

  // const [activeTrack, setActiveTrack] = useState<TrackItem | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  // const audioRef = useRef<HTMLAudioElement>(null);
  // console.log('songData', songData.slice(0, 5));

  //Add favourite
  const handleAddFavourite = (song: SongItem) => {
    const newFav = !favourites.some((fav) => fav.id === song.id); //no dupilicate
    if (newFav) setFavourites([...favourites, song]);
  };
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('code_verifier');
    setAccessToken(null);
    setProfile(null);
  };
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);

      // Fetch the profile data and update the state
      const fetchAndSetProfile = async () => {
        try {
          const profileData = await fetchProfile(token);
          setProfile(profileData);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchAndSetProfile();
    }
  }, []);
  useEffect(() => {
    const filteredSongs =
      selectedMood === 'All'
        ? getRandomSongs(songs, 4)
        : songs.filter((song) => song.mood === selectedMood).slice(0, 4);
    setThumbnailSongs(filteredSongs);
    console.log('selectedMood', selectedMood);
  }, [selectedMood, songs]);

  return (
    <>
      <Layout
        onLogOut={handleLogout}
        accessToken={accessToken}
        profile={profile}
        onLogin={initiateLogin}
      >
        <Routes>
          <Route
            index
            element={
              <Home
                moods={moods}
                onMoodSelect={setSelectedMood}
                songs={thumbnailSongs}
              />
            }
          />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
