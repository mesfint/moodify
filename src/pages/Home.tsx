import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoodCategories from '../component/MoodCategories';
import NewReleases from '../component/NewReleases';
import { useMoodify } from '../hooks/useMoodify';
import { Categories } from '../types/moodify';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme, moods, setMood, thumbnailSongs, notify } = useMoodify();

  const hasNotified = useRef(false);

  const urlMood = searchParams.get('mood') as Categories | null;
  const normalizedMoods = moods.map((mood) => mood.toLowerCase());
  const normalizedUrlMood = urlMood?.toLowerCase() ?? 'all';
  const isValidMood = normalizedMoods.includes(normalizedUrlMood);
  const currentMood = isValidMood && urlMood ? urlMood : 'All';

  const HandleMoodSelect = (newMood: Categories) => {
    setSearchParams({ mood: newMood });
    hasNotified.current = false; // Reset for future invalid checks
  };

  useEffect(() => {
    console.log({
      urlMood,
      normalizedUrlMood,
      normalizedMoods,
      isValidMood,
      currentMood,
      hasNotified: hasNotified.current,
    });
    if (urlMood && !isValidMood && !hasNotified.current) {
      console.log('Notifying for invalid mood:', urlMood);
      notify('Invalid category, defaulting to All');
      setSearchParams({ mood: 'All' });
      hasNotified.current = true;
    }
    setMood(currentMood);
  }, [
    urlMood,
    isValidMood,
    setMood,
    notify,
    normalizedUrlMood,
    normalizedMoods,
    setSearchParams,
    currentMood,
  ]);

  return (
    <div
      className={`flex flex-col flex-1 gap-4 ${
        theme === 'dark'
          ? 'bg-secondary-dark text-secondary-text-light'
          : 'bg-white text-secondary-text-dim'
      }`}
    >
      <MoodCategories
        moods={moods}
        currentMood={currentMood}
        onMoodSelect={HandleMoodSelect}
      />
      <NewReleases songs={thumbnailSongs} />
    </div>
  );
};

export default Home;
