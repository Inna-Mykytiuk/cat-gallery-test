import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCatStore } from '../store/useStore';

interface Breed {
  id: string;
  name: string;
}

interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}

const CatGallery: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const limit = 9;

  // Витягування улюблених котів з Zustand Store
  const { favorites, addFavorite, removeFavorite } = useCatStore();

  // Функція для отримання порід
  const fetchBreeds = async () => {
    try {
      const response = await axios.get<Breed[]>('https://api.thecatapi.com/v1/breeds?api_key=live_cdh15RXPzJfwEjosvt3aBjDvy064dn7ALDvHxW3ioJmMgZSkRgbG5KUIeo427OB3');
      setBreeds(response.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  // Функція для отримання зображень котів на основі вибраної породи
  const fetchCatImages = async (currentPage: number) => {
    try {
      const response = await axios.get<CatImage[]>(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${selectedBreed}&api_key=live_cdh15RXPzJfwEjosvt3aBjDvy064dn7ALDvHxW3ioJmMgZSkRgbG5KUIeo427OB3&page=${currentPage}`);
      setCatImages(response.data);

      const totalItems = Number(response.headers['pagination-count']);
      setTotalPages(Math.ceil(totalItems / limit));
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
  };

  useEffect(() => {
    fetchBreeds(); // Отримання порід котів при монтуванні компонента
  }, []);

  useEffect(() => {
    fetchCatImages(page); // Отримання зображень котів при зміні сторінки або вибраної породи
  }, [page, selectedBreed]);

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

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
                onClick={() => addFavorite(cat)}  // Використовуємо addFavorite з Zustand
                className="mr-2 p-1 bg-green-500 text-black rounded"
              >
                Add to Favorite
              </button>
              <button
                onClick={() => removeFavorite(cat)}  // Використовуємо removeFavorite з Zustand
                className="p-1 bg-red-500 text-black rounded"
              >
                Delete from Favorite
              </button>
            </div>
          </div>
        ))}
      </div>

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
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>

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
                onClick={() => removeFavorite(cat)}  // Використовуємо removeFavorite з Zustand
                className="p-1 bg-red-500 text-white rounded"
              >
                Delete from Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatGallery;