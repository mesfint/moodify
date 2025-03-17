import MoodCategories from '../component/MoodCategories';
import NewReleases from '../component/NewRelases';
import { useMoodify } from '../hooks/useMoodify';

const Home = () => {
  const { theme, moods, setSelectedMood, songs, addToFavorites, selectedMood } =
    useMoodify();
  const filteredSongs =
    selectedMood === 'All'
      ? songs
      : songs.filter((song) => song.mood === selectedMood);

  return (
    <div
      className={` ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'} flex flex-col flex-1 gap-4 pt-16 lg:pt-0`}
    >
      <div
        className={`fixed top-16  md:left-58 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'} z-10 pt-2 pb-2 `}
      >
        <MoodCategories moods={moods} onMoodSelect={setSelectedMood} />
      </div>
      <NewReleases songs={filteredSongs} onAddFavourite={addToFavorites} />
    </div>
  );
};

export default Home;
