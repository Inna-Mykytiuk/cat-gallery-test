import { useQuery } from "react-query";
import axios from "axios";
import { Breed, CatImage } from "../types/catTypes.ts";

export const useBreeds = () => {
  return useQuery<Breed[], Error>(
    "breeds",
    async () => {
      const response = await axios.get<Breed[]>(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/breeds?api_key=live_cdh15RXPzJfwEjosvt3aBjDvy064dn7ALDvHxW3ioJmMgZSkRgbG5KUIeo427OB3`
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
        `${
          import.meta.env.VITE_API_BASE_URL
        }/images/search?limit=${limit}&breed_ids=${selectedBreed}&api_key=live_cdh15RXPzJfwEjosvt3aBjDvy064dn7ALDvHxW3ioJmMgZSkRgbG5KUIeo427OB3&page=${page}`
      );
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 300000,
    }
  );
};
