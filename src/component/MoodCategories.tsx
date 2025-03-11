import { Categories } from '../types/moodify';
import { Button } from './Button';

interface CategoriesProps {
  moods: Categories[];
  onMoodSelect: (mood: Categories) => void;
}

const MoodCategories = ({
  moods,

  onMoodSelect,
}: CategoriesProps) => {
  return (
    <div className="flex flex-wrap gap-4 mx-4">
      <div className="text-xl mx-4">
        <h3>Home</h3>
      </div>
      {moods.map((mood, index) => (
        <Button
          variant="default"
          key={index}
          onClick={() => {
            onMoodSelect(mood);
          }}
          className="px-4 py-2 bg-secondary-text-dim text-secondary-text-light rounded-full shadow-md cursor-pointer"
        >
          {mood}
        </Button>
      ))}
    </div>
  );
};

export default MoodCategories;
