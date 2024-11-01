import React from 'react';

interface BreedFilterProps {
  selectedBreed: string;
  breeds: Array<{ id: string; name: string }>;
  setSelectedBreed: (breed: string) => void;
  setPage: (page: number) => void;
}

const BreedFilter: React.FC<BreedFilterProps> = ({ selectedBreed, breeds, setSelectedBreed, setPage }) => {
  return (
    <div className="flex items-center justify-center gap-8 my-8">
      <label htmlFor="breed-select" className="block text-lg">Select Breed:</label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={(e) => {
          setSelectedBreed(e.target.value);
          setPage(0);
        }}
        className="rounded-md border border-gray-300 px-4 py-2 shadow-input focus:border-mainBcg focus:outline-none"
      >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>{breed.name}</option>
        ))}
      </select>
    </div>
  );
};

export default BreedFilter;

