import axios from "axios";

import { useQuery } from "react-query";

import { Breed, CatImage } from "../types/catTypes.ts";

export const useBreeds = () => {
  return useQuery<Breed[], Error>(
    "breeds",
    async () => {
      const response = await axios.get<Breed[]>(
        `https://api.thecatapi.com/v1/breeds?api_key=live_cdh15RXPzJfwEjosvt3aBjDvy064dn7ALDvHxW3ioJmMgZSkRgbG5KUIeo427OB3`,
      );
      return response.data;
    },
    {
      staleTime: 600000,
    },
  );
};

export const useCatImages = (selectedBreed: string) => {
  return useQuery<CatImage[], Error>(
    ["catImages", selectedBreed],
    async () => {
      const response = await axios.get<CatImage[]>(
        `https://api.thecatapi.com/v1/images/search?limit=100&breed_ids=${selectedBreed}&api_key=live_cdh15RXPzJfwEjosvt3aBjDvy064dn7ALDvHxW3ioJmMgZSkRgbG5KUIeo427OB3`,
      );
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 300000,
    },
  );
};
