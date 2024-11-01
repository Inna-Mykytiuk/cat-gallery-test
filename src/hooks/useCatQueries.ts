import { useQuery } from "react-query";
import axios from "axios";
import { Breed, CatImage } from "../types/catTypes.ts";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export const useBreeds = () => {
  return useQuery<Breed[], Error>(
    "breeds",
    async () => {
      const response = await axios.get<Breed[]>(
        `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`
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
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${selectedBreed}&api_key=${API_KEY}&page=${page}`
      );
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 300000,
    }
  );
};
