import { useMoodify } from '../hooks/useMoodify';
import { Categories } from '../types/moodify';
import { Button } from './Button';

interface CategoriesProps {
  moods: Categories[];
  onMoodSelect: (mood: Categories) => void;
}

const MoodCategories = ({ moods, onMoodSelect }: CategoriesProps) => {
  const { selectedMood } = useMoodify();

  return (
    <div className="flex gap-2 px-4 overflow-x-auto ">
      {moods.map((mood, index) => (
        <Button
          variant="default"
          key={index}
          onClick={() => onMoodSelect(mood)}
          className={`px-4 py-2 ${selectedMood === mood ? 'bg-secondary-neutral-950 text-white underline' : 'bg-neutral-800'}  text-secondary-text-light rounded-full shadow-md cursor-pointer flex-wrap`}
        >
          {mood}
        </Button>
      ))}
    </div>
  );
};

export default MoodCategories;
