import axios from 'axios';
import { useEffect, useState } from 'react';
import { CategoryItem, MusicCategories } from '../types/spotify';
import { Button } from './Button';

const Categories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchCategories = async () => {
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axios.get<MusicCategories>(
          'https://api.spotify.com/v1/browse/categories',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              limit: 20,
              offset: 0,
            },
          }
        );

        const categoriesData = response.data.categories.items;
        setCategories(categoriesData);
        console.log('Fetched categories:', categoriesData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching categories:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchCategories();
  }, [accessToken]);

  // Fallback static categories
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
            key={index}
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
