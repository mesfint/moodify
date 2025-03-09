import { CategoryItem } from '../types/spotify';
import { Button } from './Button';

interface CategoriesProps {
  categories: CategoryItem[];
  //onCategorySelect: (id: string) => void;
}

const Categories = ({ categories }: CategoriesProps) => {
  const staticCategories = [
    'For You',
    'Relax',
    'Workout',
    'Travel',
    'Focus',
    'Energize',
  ];

  return (
    <div className="flex flex-wrap gap-4 mx-4">
      <div className="text-xl mx-4">
        <h3>Home</h3>
      </div>
      {(categories.length > 0 ? categories : staticCategories).map(
        (category, index) => (
          <Button
            variant="ghost"
            key={typeof category === 'string' ? index : category.id}
            onClick={() => {
              if (typeof category !== 'string') {
                console.log('Clicked category:', {
                  id: category.id,
                  name: category.name,
                });
                //onCategorySelect(category.id);
              }
            }}
            className="px-4 py-2 bg-secondary-text-dim text-secondary-text-light rounded-full shadow-md"
          >
            {typeof category === 'string' ? category : category.name}
          </Button>
        )
      )}
    </div>
  );
};

export default Categories;
