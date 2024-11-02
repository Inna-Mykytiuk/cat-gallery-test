import React, { useState } from 'react';
import { useCatStore } from '../store/useStore';
import { FaHeart } from "react-icons/fa6";
import { useBreeds, useCatImages } from '../hooks/useCatQueries';
import { CatImage } from '../types/catTypes.ts'; // Зміна імпорту

import BreedFilter from '../components/BreedFilter';
import CatModal from '../components/CatModal';

const CatGallery: React.FC = () => {
  const [limit, setLimit] = useState<number>(9);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null);
  const [, setPage] = useState<number>(0);

  const { favorites, addFavorite, removeFavorite } = useCatStore();
  const { data: breeds = [], error: breedsError } = useBreeds();
  const { data: catImages = [], error: imagesError, isLoading } = useCatImages(selectedBreed);

  const openModal = (cat: CatImage) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  if (breedsError) {
    return <p>Error loading breeds: {breedsError.message}</p>;
  }

  if (imagesError) {
    return <p>Error loading images: {imagesError.message}</p>;
  }

  return (
    <section className='pb-[100px]'>
      <div className='container'>
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
                    className="w-full h-full object-cover object-center cursor-pointer"
                    onClick={() => openModal(cat)}
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
                  onClick={() => setLimit(limit + 9)}
                  className="p-2 bg-gray-500 text-white text-lg rounded"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
        {selectedCat && (
          <CatModal
            isOpen={isModalOpen}
            onClose={closeModal}
            name={selectedCat.breeds[0]?.name || 'Unknown'}
            temperament={selectedCat.breeds[0]?.temperament || 'Not Available'}
            description={selectedCat.breeds[0]?.description || 'No description available.'}
            lifeSpan={selectedCat.breeds[0]?.life_span || 'Unknown'}
            imageUrl={selectedCat.url}
          />
        )}
      </div>
    </section>
  );
};

export default CatGallery;
