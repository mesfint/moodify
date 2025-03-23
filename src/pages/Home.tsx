import NewReleases from '../component/NewReleases';
import { useMoodify } from '../hooks/useMoodify';

const Home = () => {
  const { theme, songs, selectedMood } = useMoodify();
  const filteredSongs =
    selectedMood === 'All'
      ? songs
      : songs.filter((song) => song.mood === selectedMood);

  return (
    <div
      className={`flex flex-col flex-1 gap-4 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
    >
      <NewReleases songs={filteredSongs} />
    </div>
  );
};

export default Home;
