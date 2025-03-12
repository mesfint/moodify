import MoodCategories from '../component/MoodCategories';
import NewReleases from '../component/NewRelases';
import { Categories, SongItem } from '../types/moodify'; // Adjust path as needed

interface HomeProps {
  moods: Categories[];
  onMoodSelect: (mood: Categories) => void;
  songs: SongItem[];
}

const Home = ({ moods, onMoodSelect, songs }: HomeProps) => {
  return (
    <div className=" bg-secondary-dark">
      <MoodCategories moods={moods} onMoodSelect={onMoodSelect} />
      <NewReleases songs={songs} />
    </div>
  );
};

export default Home;
