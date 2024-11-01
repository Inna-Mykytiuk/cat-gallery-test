import React, { useState } from 'react';
import { useCatStore } from '../store/useStore';
import { FaHeart } from "react-icons/fa";
import { useBreeds, useCatImages } from '../hooks/useCats.ts';
import { CatImage } from '../types/catTypes.ts';

const CatGallery: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const limit = 9;

  const { favorites, addFavorite, removeFavorite } = useCatStore();

  const { data: breeds = [], error: breedsError } = useBreeds();
  const { data: catImages = [], error: imagesError } = useCatImages(selectedBreed, page, limit);

  if (breedsError) {
    console.error('Error fetching breeds:', breedsError);
  }
  if (imagesError) {
    console.error('Error fetching cat images:', imagesError);
  }

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

  return (
    <div className='container'>
      <h1>Cat Gallery</h1>

      <div className="mt-4">
        <label htmlFor="breed-select" className="block text-lg">Select Breed:</label>
        <select
          id="breed-select"
          value={selectedBreed}
          onChange={(e) => {
            setSelectedBreed(e.target.value);
            setPage(0);
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
        {catImages.map((cat: CatImage) => (
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
                <FaHeart
                  className="mr-1 text-red-500"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatGallery;
