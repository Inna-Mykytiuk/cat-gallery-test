import React, { useState } from 'react';
import { useCatStore } from '../store/useStore';
import { FaHeart } from "react-icons/fa6";
import { useBreeds, useCatImages } from '../hooks/useCatQueries';

import BreedFilter from '../components/BreedFilter';

const CatGallery: React.FC = () => {
  const [limit, setLimit] = useState<number>(9);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [, setPage] = useState<number>(0);

  const { favorites, addFavorite, removeFavorite } = useCatStore();

  const { data: breeds = [], error: breedsError } = useBreeds();
  const { data: catImages = [], error: imagesError, isLoading } = useCatImages(selectedBreed);

  if (breedsError) {
    console.error('Error fetching breeds:', breedsError);
  }
  if (imagesError) {
    console.error('Error fetching cat images:', imagesError);
  }

  const loadMore = () => setLimit((prevLimit) => prevLimit + 9);

  return (
    <section className='pb-[100px]'>
      <div className='container'>

        {/* Фільтр порід */}
        <BreedFilter
          selectedBreed={selectedBreed}
          breeds={breeds}
          setSelectedBreed={setSelectedBreed}
          setPage={setPage}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loader">Loading...</span>
          </div>
        ) : (
          <>
            <ul className="custom-grid mt-4">
              {catImages.slice(0, limit).map((cat) => (
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

            {limit < catImages.length && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={loadMore}
                  className="p-2 bg-gray-500 text-white text-lg rounded"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CatGallery;
