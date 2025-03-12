import MoodCategories from '../component/MoodCategories';
import NewReleases from '../component/NewRelases';
import { Categories, SongItem } from '../types/moodify'; // Adjust path as needed

interface HomeProps {
  moods: Categories[];
  onMoodSelect: (mood: Categories) => void;
  songs: SongItem[];
  onAddFavourite: (song: SongItem) => void;
}

const Home = ({ moods, onMoodSelect, songs, onAddFavourite }: HomeProps) => {
  return (
    <div className=" bg-secondary-dark">
      <MoodCategories moods={moods} onMoodSelect={onMoodSelect} />
      <NewReleases songs={songs} onAddFavourite={onAddFavourite} />
    </div>
  );
};

export default Home;
