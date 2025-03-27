import { useMoodify } from '../hooks/useMoodify';
import { Categories } from '../types/moodify';
import { Button } from './Button';

interface CategoriesProps {
  moods: Categories[];
  currentMood: Categories;
  onMoodSelect: (mood: Categories) => void;
}

const MoodCategories = ({
  moods,
  currentMood,
  onMoodSelect,
}: CategoriesProps) => {
  const { theme } = useMoodify();

  return (
    <div className="flex gap-2 md:px-4   ">
      {moods.map((mood, index) => (
        <Button
          variant="default"
          key={index}
          onClick={() => onMoodSelect(mood)}
          className={`  border-1 rounded-full shadow-md cursor-pointer sm:text-l  ${
            currentMood === mood
              ? 'bg-secondary-neutral-950 text-white underline'
              : 'bg-neutral-800'
          }  ${
            theme === 'dark'
              ? 'bg-secondary-dark text-secondary-text-light'
              : ' bg-white text-secondary-text-dim'
          }`}
        >
          {mood}
        </Button>
      ))}
    </div>
  );
};

export default MoodCategories;
