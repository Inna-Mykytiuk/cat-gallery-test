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
    <div className="container">
      <h2 className="text-2xl font-bold mt-8">Favorite Cats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {favorites.length === 0 ? (
          <p>No favorite cats added yet.</p>
        ) : (
          favorites.map((cat) => (
            <div key={cat.id} className="relative">
              <img
                src={cat.url}
                alt={`Favorite Cat ${cat.breeds[0]?.name}`}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => openModal(cat)} // Відкриття модального вікна
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
  );
};

export default FavoriteCats;
