import React, { useState } from 'react';
import { useCatStore } from '../store/useStore';
import { FaHeart } from "react-icons/fa6";
import { useBreeds, useCatImages } from '../hooks/useCatQueries';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

import BreedFilter from '../components/BreedFilter';

const CatGallery: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const limit = 9;

  const { favorites, addFavorite, removeFavorite } = useCatStore();

  const { data: breeds = [], error: breedsError } = useBreeds();
  const { data: catImages = [], error: imagesError, isLoading } = useCatImages(selectedBreed, page, limit); // Додано isLoading

  if (breedsError) {
    console.error('Error fetching breeds:', breedsError);
  }
  if (imagesError) {
    console.error('Error fetching cat images:', imagesError);
  }

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

  return (
    <section className='pb-[100px]'>
      <div className='container'>

        {/* Використання компонента фільтра */}
        <BreedFilter
          selectedBreed={selectedBreed}
          breeds={breeds}
          setSelectedBreed={setSelectedBreed}
          setPage={setPage}
        />

        {/* Лоадер */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loader">Loading...</span>
          </div>
        ) : (
          <>
            {/* Галерея зображень */}
            <ul className="custom-grid mt-4">
              {catImages.map((cat) => (
                <li key={cat.id} className="relative shadow-custom-card rounded-md overflow-hidden">
                  <img
                    src={cat.url}
                    alt={`Cat ${cat.breeds[0]?.name}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm py-4 px-4 text-center z-50 flex items-center justify-between">
                    <p className='text-white'>{cat.breeds[0]?.name || 'Unknown Breed'}</p>
                    <button
                      onClick={() => {
                        if (favorites.some(fav => fav.id === cat.id)) {
                          removeFavorite(cat);
                        } else {
                          addFavorite(cat);
                        }
                      }}
                      className="flex items-center justify-center text-xl group"
                    >
                      <FaHeart
                        className={`mr-1 transition-colors duration-300 ${favorites.some(fav => fav.id === cat.id) ? 'text-red-500' : 'text-white/70 group-hover:text-red-500'}`}
                      />
                    </button>

                  </div>
                </li>
              ))}
            </ul>

            {/* Пагінація - відображати тільки коли не завантажується */}
            <div className="mt-4 flex justify-center items-center gap-4">
              <button
                onClick={prevPage}
                className="p-2 bg-gray-500 text-white text-3xl rounded disabled:opacity-50"
                disabled={page === 0}
              >
                <FaArrowCircleLeft />
              </button>
              <button
                onClick={nextPage}
                className="p-2 bg-gray-500 text-3xl text-white rounded disabled:opacity-50"
              >
                <FaArrowCircleRight />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CatGallery;
