import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useCatStore } from '../store/useStore';
import { FaHeart } from "react-icons/fa6";

interface Breed {
  id: string;
  name: string;
}

interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}


const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const CatGallery: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const limit = 9;

  // Витягування улюблених котів з Zustand Store
  const { favorites, addFavorite, removeFavorite } = useCatStore();

  // Використання react-query для отримання списку порід
  const { data: breeds = [], error: breedsError } = useQuery(
    'breeds',
    async () => {
      const response = await axios.get<Breed[]>(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`);
      return response.data;
    },
    {
      staleTime: 600000, // Кешуємо породи на 10 хвилин, оскільки вони рідко змінюються
    }
  );

  // Використання react-query для отримання зображень котів
  const { data: catImages = [], error: imagesError } = useQuery(
    ['catImages', selectedBreed, page],  // Ключ включає обрану породу і сторінку для оновлення при зміні
    async () => {
      const response = await axios.get<CatImage[]>(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${selectedBreed}&api_key=${API_KEY}&page=${page}`);
      return response.data;
    },
    {
      keepPreviousData: true, // Зберігає попередні дані, поки завантажуються нові
      staleTime: 300000, // Кешуємо зображення на 5 хвилин
    }
  );

  // Обробка помилок
  if (breedsError) {
    console.error('Error fetching breeds:', breedsError);
  }
  if (imagesError) {
    console.error('Error fetching cat images:', imagesError);
  }

  // Переходи між сторінками
  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

  return (
    <div className='container'>
      <h1>Cat Gallery</h1>

      {/* Фільтр за породами */}
      <div className="mt-4">
        <label htmlFor="breed-select" className="block text-lg">Select Breed:</label>
        <select
          id="breed-select"
          value={selectedBreed}
          onChange={(e) => {
            setSelectedBreed(e.target.value);
            setPage(0); // Скидання сторінки при зміні породи
          }}
          className="p-2 border rounded"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>{breed.name}</option>
          ))}
        </select>
      </div>

      {/* Галерея зображень */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {catImages.map((cat) => (
          <div key={cat.id} className="relative">
            <img
              src={cat.url}
              alt={`Cat ${cat.breeds[0]?.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white opacity-80 p-2 text-center z-50">
              <p>{cat.breeds[0]?.name || 'Unknown Breed'}</p>
              <button
                onClick={() => {
                  if (favorites.some(fav => fav.id === cat.id)) {
                    removeFavorite(cat);
                  } else {
                    addFavorite(cat);
                  }
                }}
                className="flex items-center justify-center text-xl"
              >
                <FaHeart
                  className={`mr-1 ${favorites.some(fav => fav.id === cat.id) ? 'text-red-500' : 'text-black opacity-50'}`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Пагінація */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevPage}
          className="p-2 bg-gray-500 text-white rounded disabled:opacity-50"
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="p-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Улюблені коти */}
      <h2 className="text-2xl font-bold mt-8">Favorite Cats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {favorites.map((cat) => (
          <div key={cat.id} className="relative">
            <img
              src={cat.url}
              alt={`Favorite Cat ${cat.breeds[0]?.name}`}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white opacity-80 p-2 text-center">
              <p>{cat.breeds[0]?.name || 'Unknown Breed'}</p>
              <button
                onClick={() => removeFavorite(cat)}
                className="p-1"
              >
                <FaHeart className="mr-1 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatGallery;
