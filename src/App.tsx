import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router';
import Callback from './component/Callback';
import Header from './component/Header';
import NewRelases from './component/NewRelases';
import Sidebar from './component/Sidebar';
import { fetchProfile, initiateLogin } from './services/auth-service';
import {
  AlbumItem,
  CategoryItem,
  NewReleasesResponse,
  TrackItem,
  UserProfile,
} from './types/spotify';
import { getRandomAlbum } from './utils/random';

const App = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
  //   null
  // );
  const [thumbnailTracks, setThumbnailTracks] = useState<TrackItem[]>([]);
  const [activeTrack, setActiveTrack] = useState<TrackItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  // const handleSelectedCategory = (id: string) => {
  //   //const selected = categories.find((category) => category.id === id);
  //   // setSelectedCategory(selected || null);
  // };
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
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     if (!accessToken) {
  //       console.error('No access token found');
  //       return;
  //     }

  //     try {
  //       const response = await axios.get<MusicCategories>(
  //         'https://api.spotify.com/v1/browse/categories',
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           params: {
  //             limit: 20,
  //             offset: 0,
  //           },
  //         }
  //       );
  //       const categoriesData = response.data.categories.items;
  //       setCategories(categoriesData);
  //       console.log('Fetched categories:', categoriesData);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error('Error fetching categories:', {
  //           message: error.message,
  //           status: error.response?.status,
  //           data: error.response?.data,
  //         });
  //       } else {
  //         console.error('Unexpected error:', error);
  //       }
  //     }
  //   };

  //   fetchCategories();
  // }, [accessToken]);

  useEffect(() => {
    const fetchNewReleases = async () => {
      if (!accessToken) {
        console.log('Waiting for access token');
        return;
      }

      console.log('Fetching new releases');

      try {
        const response = await axios.get<NewReleasesResponse>(
          'https://api.spotify.com/v1/browse/new-releases',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { limit: 10, offset: 0 },
          }
        );
        const albumData = response.data.albums.items;
        setAlbums(albumData);
        console.log('Fetched new releases:', albumData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching new releases:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };
    fetchNewReleases();
  }, [accessToken]); // Removed selectedCategory dependency

  useEffect(() => {
    const fetchTracks = async () => {
      if (!accessToken || albums.length === 0) return;

      const tenRandomAlbums = getRandomAlbum(albums, 10);
      const trackPromises = tenRandomAlbums.map((album) =>
        axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { limit: 1 }, //One track per album
        })
      );
      const responses = await Promise.all(trackPromises);
      const tracks = responses
        .map((res) => res.data.items[0])
        .filter((track) => track.preview_url);
      setThumbnailTracks(tracks);
      setActiveTrack(tracks[0] || null);

      console.log('reponses', responses);
    };
    fetchTracks();
  }, [accessToken, albums]);

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
        {/* <Categories
          categories={categories}
          //onCategorySelect={handleSelectedCategory}
        /> */}
        <NewRelases thumbnails={thumbnailTracks} />
      </div>

      <Routes>
        <Route path="/callback" element={<Callback />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </div>
  );
};

export default App;
