import { useMoodify } from '../hooks/useMoodify';
import { Categories } from '../types/moodify';
import { Button } from './Button';

interface CategoriesProps {
  moods: Categories[];
  onMoodSelect: (mood: Categories) => void;
}

const MoodCategories = ({ moods, onMoodSelect }: CategoriesProps) => {
  const { selectedMood, theme } = useMoodify();

  return (
    <div className="flex gap-2 px-4 overflow-x-auto ">
      {moods.map((mood, index) => (
        <Button
          variant="default"
          key={index}
          onClick={() => onMoodSelect(mood)}
          className={`  border-1 rounded-full shadow-md cursor-pointer flex-wrap px-4 py-2 ${selectedMood === mood ? 'bg-secondary-neutral-950 text-white underline' : 'bg-neutral-800'}  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
        >
          {mood}
        </Button>
      ))}
    </div>
  );
};

export default MoodCategories;
