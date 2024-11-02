import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";

import CatModal from "../components/CatModal";
import { useCatStore } from "../store/useStore";
import { CatImage } from "../types/catTypes.ts";

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
              <div
                key={cat.id}
                className="relative overflow-hidden rounded-md shadow-custom-card"
              >
                <img
                  src={cat.url}
                  alt={`Favorite Cat ${cat.breeds[0]?.name}`}
                  className="h-full w-full cursor-pointer object-cover object-center transition-all duration-200 ease-in-out hover:scale-110"
                  onClick={() => openModal(cat)}
                />
                <div className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-black/20 px-4 py-4 text-center backdrop-blur-sm">
                  <p className="text-white">
                    {cat.breeds[0]?.name || "Unknown Breed"}
                  </p>
                  <button
                    type="button"
                    aria-label="Remove Favorite"
                    onClick={() => removeFavorite(cat)}
                    className="group flex items-center justify-center text-xl"
                  >
                    <FaHeart
                      className={`mr-1 transition-colors duration-300 ${favorites.some((fav) => fav.id === cat.id) ? "text-red-500" : "text-white/70 group-hover:text-red-500"}`}
                    />
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
            name={selectedCat.breeds[0]?.name || "Unknown"}
            temperament={selectedCat.breeds[0]?.temperament || "Not Available"}
            description={
              selectedCat.breeds[0]?.description || "No description available."
            }
            lifeSpan={selectedCat.breeds[0]?.life_span || "Unknown"}
            imageUrl={selectedCat.url}
          />
        )}
      </div>
    </section>
  );
};

export default FavoriteCats;
