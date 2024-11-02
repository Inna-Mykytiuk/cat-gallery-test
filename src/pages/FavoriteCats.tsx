// src/components/FavoriteCats.tsx
import React, { useState } from 'react';
import { useCatStore } from '../store/useStore';
import { FaHeart } from "react-icons/fa6";
import CatModal from '../components/CatModal'; // Імпорт компоненту CatModal
import { CatImage } from '../types/catTypes.ts'; // Імпорт типів

const FavoriteCats: React.FC = () => {
  const { favorites, removeFavorite } = useCatStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null);

  const openModal = (cat: CatImage) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCat(null);
    setIsModalOpen(false);
  };

  return (
    <section className="pb-[50px] md:pb-[100px]">
      <div className="container mt-8">
        <div className="custom-grid mt-4">
          {favorites.length === 0 ? (
            <p>No favorite cats added yet.</p>
          ) : (
            favorites.map((cat) => (
              <div key={cat.id} className="relative shadow-custom-card rounded-md overflow-hidden">
                <img
                  src={cat.url}
                  alt={`Favorite Cat ${cat.breeds[0]?.name}`}
                  className="w-full h-full object-cover object-center cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
                  onClick={() => openModal(cat)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm py-4 px-4 text-center z-50 flex items-center justify-between">
                  <p className='text-white'>{cat.breeds[0]?.name || 'Unknown Breed'}</p>
                  <button
                    onClick={() => removeFavorite(cat)}
                    className="flex items-center justify-center text-xl group"
                  >
                    <FaHeart className={`mr-1 transition-colors duration-300 ${favorites.some(fav => fav.id === cat.id) ? 'text-red-500' : 'text-white/70 group-hover:text-red-500'}`} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
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

export default FavoriteCats;
