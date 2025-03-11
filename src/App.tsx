import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Callback from './component/Callback';
import Favourite from './component/Favourite';
import Header from './component/Header';
import MoodCategories from './component/MoodCategories';
import NewRelases from './component/NewRelases';
import Sidebar from './component/Sidebar';
import { Moods, songData } from './data/songs';
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
  // const [activeTrack, setActiveTrack] = useState<TrackItem | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  // const audioRef = useRef<HTMLAudioElement>(null);
  // console.log('songData', songData.slice(0, 5));

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
    <div className="min-h-screen flex bg-secondary-dark text-secondary-text-light">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-4">
        <Header
          onLogOut={handleLogout}
          accessToken={accessToken}
          profile={profile}
          onLogin={initiateLogin}
        />
        <MoodCategories
          moods={moods}
          onMoodSelect={setSelectedMood}
          //onCategorySelect={handleSelectedCategory}
        />
        <NewRelases songs={thumbnailSongs} />
      </div>

      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/favourite" element={<Favourite />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </div>
  );
};

export default App;
