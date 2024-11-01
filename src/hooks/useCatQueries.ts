import { useQuery } from "react-query";
import axios from "axios";
import { Breed, CatImage } from "../types/catTypes.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export const useBreeds = () => {
  return useQuery<Breed[], Error>(
    "breeds",
    async () => {
      const response = await axios.get<Breed[]>(
        `${API_BASE_URL}/breeds?api_key=${API_KEY}`
      );
      return response.data;
    },
    {
      staleTime: 600000,
    }
  );
};

export const useCatImages = (
  selectedBreed: string,
  page: number,
  limit: number
) => {
  return useQuery<CatImage[], Error>(
    ["catImages", selectedBreed, page],
    async () => {
      const response = await axios.get<CatImage[]>(
        `${API_BASE_URL}/images/search?limit=${limit}&breed_ids=${selectedBreed}&api_key=${API_KEY}&page=${page}`
      );
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 300000,
    }
  );
};
