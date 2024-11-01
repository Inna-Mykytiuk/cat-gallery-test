import { create } from "zustand";

interface Breed {
  id: string;
  name: string;
}

interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}

interface CatStore {
  favorites: CatImage[];
  addFavorite: (cat: CatImage) => void;
  removeFavorite: (cat: CatImage) => void;
}

const getFavoritesFromLocalStorage = (): CatImage[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const useCatStore = create<CatStore>((set) => ({
  favorites: getFavoritesFromLocalStorage(),
  addFavorite: (cat) =>
    set((state) => {
      if (!state.favorites.find((fav) => fav.id === cat.id)) {
        const newFavorites = [...state.favorites, cat];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return { favorites: newFavorites };
      }
      return state;
    }),
  removeFavorite: (cat) =>
    set((state) => {
      const newFavorites = state.favorites.filter((fav) => fav.id !== cat.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),
}));
