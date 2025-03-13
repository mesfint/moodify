import MoodCategories from '../component/MoodCategories';
import NewReleases from '../component/NewRelases';
import { useMoodify } from '../hooks/useMoodify';

const Home = () => {
  const { moods, setSelectedMood, thumbnailSongs, addToFavorites } =
    useMoodify();

  return (
    <div className="bg-secondary-dark flex flex-col gap-4">
      <MoodCategories moods={moods} onMoodSelect={setSelectedMood} />
      <NewReleases songs={thumbnailSongs} onAddFavourite={addToFavorites} />
    </div>
  );
};

export default Home;
