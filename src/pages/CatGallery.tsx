import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";

import BreedFilter from "../components/BreedFilter";
import CatModal from "../components/CatModal";
import { useBreeds, useCatImages } from "../hooks/useCatQueries";
import { useCatStore } from "../store/useStore";
import { CatImage } from "../types/catTypes.ts";

const CatGallery: React.FC = () => {
  const [limit, setLimit] = useState<number>(9);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null);
  const [, setPage] = useState<number>(0);

  const { favorites, addFavorite, removeFavorite } = useCatStore();
  const { data: breeds = [], error: breedsError } = useBreeds();
  const {
    data: catImages = [],
    error: imagesError,
    isLoading,
  } = useCatImages(selectedBreed);

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
    <section className="pb-[50px] md:pb-[100px]">
      <div className="container">
        <BreedFilter
          selectedBreed={selectedBreed}
          breeds={breeds}
          setSelectedBreed={setSelectedBreed}
          setPage={setPage}
        />
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="loader">Loading...</span>
          </div>
        ) : (
          <>
            <ul className="custom-grid mt-4">
              {catImages.slice(0, limit).map((cat) => (
                <li
                  key={cat.id}
                  className="relative overflow-hidden rounded-md shadow-custom-card"
                >
                  <img
                    src={cat.url}
                    alt={`Cat ${cat.breeds[0]?.name}`}
                    className="h-full w-full cursor-pointer object-cover object-center transition-all duration-200 ease-in-out hover:scale-110"
                    onClick={() => openModal(cat)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-black/20 px-4 py-4 text-center backdrop-blur-sm">
                    <p className="text-white">
                      {cat.breeds[0]?.name || "Unknown Breed"}
                    </p>
                    <button
                      type="button"
                      aria-label="Add to favorites"
                      onClick={() => {
                        if (favorites.some((fav) => fav.id === cat.id)) {
                          removeFavorite(cat);
                        } else {
                          addFavorite(cat);
                        }
                      }}
                      className="group flex items-center justify-center text-xl"
                    >
                      <FaHeart
                        className={`mr-1 transition-colors duration-300 ${favorites.some((fav) => fav.id === cat.id) ? "text-red-500" : "text-white/70 group-hover:text-red-500"}`}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {limit < catImages.length && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit(limit + 9)}
                  className="rounded bg-gray-500 p-2 text-lg text-white transition-colors duration-300 ease-out hover:bg-gray-600"
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

export default CatGallery;
