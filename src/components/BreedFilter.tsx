import React from 'react';

interface BreedFilterProps {
  selectedBreed: string;
  breeds: Array<{ id: string; name: string }>;
  setSelectedBreed: (breed: string) => void;
  setPage: (page: number) => void;
}

const BreedFilter: React.FC<BreedFilterProps> = ({ selectedBreed, breeds, setSelectedBreed, setPage }) => {
  return (
    <div className="mt-4">
      <label htmlFor="breed-select" className="block text-lg">Select Breed:</label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={(e) => {
          setSelectedBreed(e.target.value);
          setPage(0);
        }}
        className="p-2 border rounded"
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

